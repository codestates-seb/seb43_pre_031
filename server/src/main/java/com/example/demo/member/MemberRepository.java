package com.example.demo.member;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByMemberId(Long memberId);
    Optional<Member> findByEmail(String email);
    Optional<Member> findByFullName(String name);
    List<Member> findAllByMemberStatus(Member.MemberStatus status);
}
