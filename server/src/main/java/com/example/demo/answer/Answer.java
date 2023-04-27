package com.example.demo.answer;

import com.example.demo.BaseEntity.BaseEntity;
import com.example.demo.member.Member;
import com.example.demo.question.Question;
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

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    public void setMember(Member member) {
        this.member = member;
    }

    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;
    public void setQuestion(Question question) {
        this.question = question;
    }

    public enum AnswerStatus {
        ANSWER_VALID("등록됨"),
        ANSWER_DELETED("삭제됨");
        @Getter
        private String answerStatus;
        AnswerStatus(String status) {
            this.answerStatus = status;
        }
    }

    public Answer(long id, String content, AnswerStatus status) {
        this.id = id;
        this.content = content;
        this.status = status;
    }

}
