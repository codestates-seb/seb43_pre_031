package com.example.demo.answer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class AnswerDto {
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {
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
        private String content;
        private LocalDateTime created_at;
        private LocalDateTime modified_at;
        private Answer.AnswerStatus status;

    }
}
