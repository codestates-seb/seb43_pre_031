package com.example.demo.question;

import com.example.demo.answer.Answer;
import com.example.demo.member.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter
    private Long id;
    @Setter
    private String title;
    @Setter
    private String content;
    @Setter
    private String askedAt;
    @Setter
    private String modifiedAt;
    @Setter
    private String tags;
    @Setter
    private int votes;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "question")
    private List<Answer> answers = new ArrayList<>();

    //status 추가 필요

//    @OneToOne(mappedBy = "question", cascade = CascadeType.PERSIST)
//    private Vote vote;
//
//    public void setVote(Vote vote)
//    {
//        this.vote = vote;
//    }

    public void setMember(Member member) {
        this.member = member;
    }

    public Question(String title, String content)
    {
        this.title = title;
        this.content = content;
    }

    public void addAnswer(Answer answer) {
        answers.add(answer);
    }

    public Question(String title, String content, String askedAt, String tags)
    {
        this.title = title;
        this.content = content;
        this.askedAt = askedAt;
        this.tags = tags;
    }

    public Question(long id, String title, String content, String modifiedAt, String tags)
    {
        this.id = id;
        this.title = title;
        this.content = content;
        this.modifiedAt = modifiedAt;
        this.tags = tags;
    }
}
