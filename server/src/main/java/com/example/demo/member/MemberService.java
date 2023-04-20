package com.example.demo.member;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());

        return memberRepository.save(member);
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
        Member findMember = optionalMember.orElseThrow(() -> new RuntimeException());
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
