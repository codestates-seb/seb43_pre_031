package com.example.demo.answer;

import com.example.demo.member.Member;
import com.example.demo.question.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class AnswerDto {
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {
        @NotNull
        private Long question_id;
        private String email;
        @NotBlank
        private String content;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long id;
        @NotBlank
        private String content;
        public void setId(long id) { this.id = id; }
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long id;
        private long question_id;
        private long member_id;
        private String memberName;
        private String content;
        private LocalDateTime created_at;
        private LocalDateTime modified_at;
        private Answer.AnswerStatus status;

    }
}
