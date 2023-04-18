package com.example.demo.answer;

import com.example.demo.BaseEntity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@EnableJpaAuditing
@Entity
public class Answer extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Setter
    @Column(length = 255, nullable = false)
    private String content;
    @Enumerated(EnumType.STRING)
    private AnswerStatus status = AnswerStatus.ANSWER_VALID;

    public enum AnswerStatus {
        ANSWER_VALID("등록됨"),
        ANSWER_DELETED("삭제됨");
        @Getter
        private String answerStatus;
        AnswerStatus(String status) {
            this.answerStatus = status;
        }
    }

}
