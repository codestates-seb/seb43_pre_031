package com.example.demo.member;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class MemberDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank(message = "이름은 공백이 아니어야 합니다.")
        private String fullName;

        @NotBlank(message = "이메일은 공백이 아니어야 합니다.")
        @Email
        private String email;

        @NotBlank(message = "비밀번호는 공백이 아니어야 합니다.")
        private String password;

        private Boolean isMarketing;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long memberId;

        @NotBlank(message = "이름은 공백이 아니어야 합니다.")
        private String fullName;

        @NotBlank(message = "비밀번호는 공백이 아니어야 합니다.")
        private String password;

        private Boolean isMarketing;

        private Member.MemberStatus memberStatus;

        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }
    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        private long memberId;
        private String fullName;
        private String email;
        private Boolean isMarketing;
        private Member.MemberStatus memberStatus;

        public String getMemberStatus() {
            return memberStatus.getStatus();
        }
    }
}
