package com.example.demo.auth.handler;

import com.example.demo.auth.filter.JwtAuthenticationFilter;
import com.example.demo.auth.filter.JwtVerificationFilter;
import com.example.demo.auth.jwt.JwtTokenizer;
import com.example.demo.auth.utils.ErrorResponder;
import com.example.demo.exception.BusinessLogicException;
import com.example.demo.exception.ExceptionCode;
import com.example.demo.member.Member;
import com.example.demo.member.MemberRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Key;
import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
public class MemberAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Value("${jwt.key}")
    private String secretKey;

    private final RedisTemplate redisTemplate;
    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;

    public MemberAuthenticationEntryPoint(RedisTemplate redisTemplate, JwtTokenizer jwtTokenizer, MemberRepository memberRepository) {
        this.redisTemplate = redisTemplate;
        this.jwtTokenizer = jwtTokenizer;
        this.memberRepository = memberRepository;
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {

        String accessJws = request.getHeader("Authorization").replace("Bearer ", "");
        String refreshJws = request.getHeader("Refresh");

        System.out.println("---------------- Access 토큰 : " + accessJws + "----------------");
        System.out.println("---------------- Refresh 토큰 : " + refreshJws + "----------------");
        if (redisTemplate.keys(refreshJws) == null) {
            Exception exception = (Exception) request.getAttribute("exception");
            ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED);

            logExceptionMessage(authException, exception);
            System.out.println("Refresh 토큰이 만료되었습니다.");
        }
        else {
            String email = (String) redisTemplate.opsForValue().get(refreshJws);
            String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

            Member member = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
            String newAccessJws = regenerateAccessToken(member);

            response.setHeader("Authorization", "Bearer " + newAccessJws);

            System.out.println("=============== Access 토큰 재발행 ===============" + base64EncodedSecretKey + email);
            System.out.println(member.getEmail() + "의 Access 토큰이 재발행되었습니다.");
            System.out.println("AccessToken : " + "Bearer " +  newAccessJws);
        }

        //redis에 refresh 토큰이 존재하면
        //refresh 토큰을 통해 redis에서 email 추출
        //멤버 객체 get
        //액세스 토큰 재발행
        //redis에 refresh 토큰이 존재하지 않으면 exception
    }

    private void logExceptionMessage(AuthenticationException authException, Exception exception) {
        String message = exception != null ? exception.getMessage() : authException.getMessage();
        log.warn("Unauthorized error happened: {}", message);
    }

    private String regenerateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }


}
