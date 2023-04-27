package com.example.demo.helper.event;

import com.example.demo.member.Member;
import lombok.Getter;

@Getter
public class MemberRegistrationApplicationEvent {
    private Member member;
    public MemberRegistrationApplicationEvent(Member member) {
        this.member = member;
    }

}
