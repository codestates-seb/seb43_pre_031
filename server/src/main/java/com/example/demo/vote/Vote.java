package com.example.demo.vote;

import com.example.demo.question.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * Vote Entity가 필요할지, 아니면 단순히 question 과 answer entity에 필드로 추가할지
 */

//@Getter
//@NoArgsConstructor
//@Entity
//public class Vote {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long id;
//
//    private int voteCount;
//
//    @OneToOne
//    @JoinColumn(name = "QUESTION_ID")
//    private Question question;
//
//    public void setQuestion(Question question)
//    {
//        this.question = question;
//    }
//}
