package com.example.demo.question;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class QuestionDto {

    @Getter
    @AllArgsConstructor
    public static class Post
    {
        private String title;
        private String content;
    }
    @Getter
    @AllArgsConstructor
    public static class Patch
    {
        @Setter
        private Long id;
        private String title;
        private String content;
    }

    @Getter
    @AllArgsConstructor
    public static class Response
    {
        private Long id;
        private String title;
        private String content;
    }
}
