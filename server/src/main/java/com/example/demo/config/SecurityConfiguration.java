package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfiguration {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception
    {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .authorizeHttpRequests()
                .anyRequest()
                .permitAll();

        return http.build();
    }
}
