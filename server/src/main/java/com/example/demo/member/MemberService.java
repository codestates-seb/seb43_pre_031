package com.example.demo.member;

import com.example.demo.auth.utils.CustomAuthorityUtils;
import com.example.demo.exception.BusinessLogicException;
import com.example.demo.exception.ExceptionCode;
import com.example.demo.helper.event.MemberRegistrationApplicationEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final ApplicationEventPublisher publisher;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public MemberService(MemberRepository memberRepository, ApplicationEventPublisher publisher, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.publisher = publisher;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);

        publisher.publishEvent(new MemberRegistrationApplicationEvent(savedMember));
        return savedMember;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getFullName()).ifPresent(fullName -> findMember.setFullName(fullName));
        Optional.ofNullable(member.getPassword()).ifPresent(password -> findMember.setPassword(password));
        Optional.ofNullable(member.getIsCaptcha()).ifPresent(isCaptcha -> findMember.setIsCaptcha(isCaptcha));
        Optional.ofNullable(member.getIsMarketing()).ifPresent(isMarketing -> findMember.setIsMarketing(isMarketing));
        Optional.ofNullable(member.getMemberStatus()).ifPresent(memberStatus -> findMember.setMemberStatus(memberStatus));

        return memberRepository.save(findMember);
    }

    @Transactional(readOnly = true)
    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);

        memberRepository.delete(findMember);
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    /**
     * 작성자: 한재영
     * @param userName
     * @return
     */
    public Member findVerifiedMember(String userName)
    {
        Optional<Member> optionalMember = memberRepository.findByFullName(userName);
        Member findMember = optionalMember.orElseThrow(() -> new RuntimeException());
        return findMember;
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            throw new RuntimeException();
        }
    }

}
