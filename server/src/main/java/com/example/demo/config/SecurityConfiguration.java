package com.example.demo.config;


import com.example.demo.auth.filter.JwtAuthenticationFilter;
import com.example.demo.auth.filter.JwtVerificationFilter;
import com.example.demo.auth.handler.MemberAccessDeniedHandler;
import com.example.demo.auth.handler.MemberAuthenticationEntryPoint;
import com.example.demo.auth.handler.MemberAuthenticationFailureHandler;
import com.example.demo.auth.handler.MemberAuthenticationSuccessHandler;
import com.example.demo.auth.jwt.JwtTokenizer;
import com.example.demo.auth.utils.CustomAuthorityUtils;
import com.example.demo.member.MemberRepository;
import com.example.demo.member.MemberServiceForOAuth;
import com.example.demo.oauth2.OAuth2MemberSuccessHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    private final MemberServiceForOAuth memberService;
    private final RedisTemplate redisTemplate;
    private final MemberRepository memberRepository;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, MemberServiceForOAuth memberService, RedisTemplate redisTemplate, MemberRepository memberRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.memberService = memberService;
        this.redisTemplate = redisTemplate;
        this.memberRepository = memberRepository;
    }

    @Value("${spring.security.oauth2.client.registration.google.clientId}")  // (1)
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.clientSecret}") // (2)
    private String clientSecret;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
            .and()
                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint(redisTemplate, jwtTokenizer, memberRepository))
                .accessDeniedHandler(new MemberAccessDeniedHandler())

            .and()
                .apply(new CustomFilterConfigurer())

            .and()
                .authorizeHttpRequests()
                .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                .antMatchers(HttpMethod.GET, "/questions/**").permitAll()
                .antMatchers(HttpMethod.GET, "/questions").permitAll()
                .antMatchers(HttpMethod.PATCH, "/questions/**").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/questions").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/questions/**").hasAnyRole("USER", "ADMIN")

                .antMatchers(HttpMethod.GET, "/members/**").permitAll()
                .antMatchers(HttpMethod.POST, "/members/**").permitAll()
                .antMatchers(HttpMethod.PATCH, "/members/**").hasRole("USER")
                .antMatchers(HttpMethod.GET, "/members").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/members").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/members/**").hasRole("USER")

                .antMatchers(HttpMethod.PATCH, "/answers/**").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/answers").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/answers/**").hasAnyRole("USER", "ADMIN")
                .anyRequest().permitAll()
                .and()
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer,authorityUtils,memberService))
                )


        //.clientRegistrationRepository(clientRegistrationRepository())

        ;
        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList(
                "http://localhost:3000",
                "http://localhost:3001",
                "http://seb43-pre-031.s3-website.ap-northeast-2.amazonaws.com"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE"));
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

//    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
//        @Override
//        public void configure(HttpSecurity builder) throws Exception {
//            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);
//
//            builder.addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class); // (2)
//        }
//    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity>
    {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, redisTemplate);
            jwtAuthenticationFilter.setFilterProcessesUrl("/members/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
            builder
                    .addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }

    /**
     * yml 파일에 clientID, Secret이 포함된 경우 자동으로 설정된다??
     */
    @Bean
    public ClientRegistrationRepository clientRegistrationRepository()
    {
        var clientRegistration = clientRegistration();

        return new InMemoryClientRegistrationRepository(clientRegistration);
    }
    private ClientRegistration clientRegistration()
    {
        return CommonOAuth2Provider
                .GOOGLE
                .getBuilder("google")
                .clientId(clientId)
                .clientSecret(clientSecret)
                .build();
    }
}
