package com.example.demo.auth.details;

import com.example.demo.auth.jwt.JwtTokenizer;
import com.example.demo.auth.utils.CustomAuthorityUtils;
import com.example.demo.exception.BusinessLogicException;
import com.example.demo.exception.ExceptionCode;
import com.example.demo.member.Member;
import com.example.demo.member.MemberRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Key;
import java.util.Collection;
import java.util.Map;
import java.util.Optional;

import static com.example.demo.member.Member.MemberStatus.MEMBER_QUIT;

@Component
public class MemberDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;
    private final RedisTemplate redisTemplate;

    public MemberDetailsService(MemberRepository memberRepository, CustomAuthorityUtils authorityUtils, RedisTemplate redisTemplate) {
        this.memberRepository = memberRepository;
        this.authorityUtils = authorityUtils;
        this.redisTemplate = redisTemplate;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        if (findMember.getMemberStatus().equals(MEMBER_QUIT)) {
            System.out.println("탈퇴한 회원입니다.");
            throw new BusinessLogicException(ExceptionCode.MEMBER_QUIT);
        }

        return new MemberDetails(findMember);
    }

    private final class MemberDetails extends Member implements UserDetails {
        MemberDetails(Member member) {
            setMemberId(member.getMemberId());
            setFullName(member.getFullName());
            setEmail(member.getEmail());
            setPassword(member.getPassword());
            setRoles(member.getRoles());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }

    public void logout(HttpServletRequest request, HttpServletResponse response) {
        String refreshJws = request.getHeader("Refresh");

        redisTemplate.delete(refreshJws);
        response.setHeader("Authorization", "");
        response.setHeader("Refresh", "");
    }

}
