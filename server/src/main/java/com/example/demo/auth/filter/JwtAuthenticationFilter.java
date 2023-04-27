package com.example.demo.auth.filter;

import com.example.demo.auth.dto.LoginDto;
import com.example.demo.auth.jwt.JwtTokenizer;
import com.example.demo.member.Member;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.Getter;
import lombok.SneakyThrows;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;
    private final RedisTemplate redisTemplate;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer, RedisTemplate redisTemplate) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenizer = jwtTokenizer;
        this.redisTemplate = redisTemplate;
    }

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, AuthenticationManager authenticationManager1, JwtTokenizer jwtTokenizer, RedisTemplate redisTemplate) {
        super(authenticationManager);
        this.authenticationManager = authenticationManager1;
        this.jwtTokenizer = jwtTokenizer;
        this.redisTemplate = redisTemplate;
    }

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                            FilterChain chain, Authentication authResult) throws ServletException, IOException {
        Member member = (Member) authResult.getPrincipal();

        String accessToken = delegateAccessToken(member);
        String refreshToken = delegateRefreshToken(member);
        Long memberId = member.getMemberId();
        Integer expiration = jwtTokenizer.getAccessTokenExpirationMinutes();

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);

        TokenResponse tokenResponse = new TokenResponse(memberId, expiration,accessToken, refreshToken);
        Gson gson = new Gson();
        response.getWriter().println(gson.toJson(tokenResponse));

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);

        redisTemplate.opsForValue().set(refreshToken, member.getEmail(), Duration.ofMinutes(420));
    }

    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        //claims.put("memberId", member.getMemberId());
        claims.put("email", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    @Getter
    private static class TokenResponse
    {
        private Long memberId;
        private Integer accessTokenExpirationMinutes;
        private String accessToken;
        private String refreshToken;
        public TokenResponse(Long memberId,Integer expiration, String accessToken,String refreshToken)
        {
            this.memberId = memberId;
            this.accessTokenExpirationMinutes = expiration;
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        }
    }
}
