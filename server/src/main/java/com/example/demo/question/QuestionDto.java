package com.example.demo.question;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * Post에 memberID를 받는 작업이 필요함
 */

public class QuestionDto {

    @Getter
    @AllArgsConstructor
    public static class Post
    {
        private Long memberId;
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
