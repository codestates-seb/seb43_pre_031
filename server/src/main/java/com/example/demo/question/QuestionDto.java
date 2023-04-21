package com.example.demo.question;

import com.example.demo.answer.Answer;
import com.example.demo.answer.AnswerDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import java.util.List;

/**
 * Post에 memberID를 받는 작업이 필요함
 */

public class QuestionDto {

    @Getter
    @AllArgsConstructor
    public static class Post
    {
        @NotBlank
        private String title;
        private String content;
        private String asked_at;
        @NotBlank
        private String member;
        private List<String> tags;
    }
    @Getter
    @AllArgsConstructor
    public static class Patch
    {
        private String title;
        private String content;
        private String modified_at;
        private String member;
        private List<String> tags;
    }

    @Getter
    @AllArgsConstructor
    public static class Response
    {
        private Long id;
        private String title;
        private String content;
        private String asked_at;
        private String modified_at;
        private Long memberId;
        private String member;
        private List<String> tags;
    }

    @Getter
    @AllArgsConstructor
    public static class ResponseWithAnswers
    {
        private Long id;
        private String title;
        private String content;
        private String asked_at;
        private String modified_at;
        private Long memberId;
        private String member;
        private List<String> tags;
        private List<AnswerDto.Response> answers;
    }
}
