package com.example.demo.auth.handler;

import com.example.demo.auth.jwt.JwtTokenizer;
import com.example.demo.auth.utils.CustomAuthorityUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;


import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;




@Slf4j
public class MemberAuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    public MemberAuthenticationSuccessHandler(JwtTokenizer jwtTokenizer,
                                              CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws ServletException, IOException {
        log.info("인증에 성공하였습니다.");

        SavedRequest savedRequest = new HttpSessionRequestCache().getRequest(request, response);
        if(savedRequest == null) response.sendRedirect("/questions");
        else super.onAuthenticationSuccess(request,response,authentication);
    }
}
