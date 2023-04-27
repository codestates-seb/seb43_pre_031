package com.example.demo.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class LoginDto {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post {
        private String email;
        private String password;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response {
        private long memberId;
        private String fullName;
        private String email;
        private String token;
    }
}
