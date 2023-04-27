package com.example.demo.auth.handler;

import com.example.demo.auth.jwt.JwtTokenizer;
import com.example.demo.auth.utils.CustomAuthorityUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.web.util.UriComponentsBuilder;


import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;


@Slf4j
public class MemberAuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        log.info("인증에 성공하였습니다.");

//        String uri = createURI().toString();
//        getRedirectStrategy().sendRedirect(request, response, uri);
    }

//    private URI createURI() {
//
//
//        return UriComponentsBuilder
//                .newInstance()
//                .scheme("http")
//                .host("localhost")
//                .port(3000)
//                .path("/")
//                .build()
//                .toUri();
//    }
}
