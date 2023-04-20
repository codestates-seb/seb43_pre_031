package com.example.demo.question;

import com.example.demo.member.Member;
import com.example.demo.member.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * 기본 CRUD메서드 구현
 */

@Service
public class QuestionService {

    private QuestionRepository questionRepository;
    private MemberService memberService;

    public QuestionService(QuestionRepository questionRepository,
                           MemberService memberService)
    {
        this.questionRepository = questionRepository;
        this.memberService = memberService;
    }
    public Question createQuestion(Question question)
    {
        // 검증 : 이미 등록된 질문인지
        // 필요한가?
        verifyQuestion(question);

        return questionRepository.save(question);
    }

    public Question updateQuestion(Question question)
    {
        Question findQuestion = findVerifiedQuestion(question.getId());

        Optional.ofNullable(question.getTitle()).ifPresent(title -> findQuestion.setTitle(title));
        Optional.ofNullable(question.getContent()).ifPresent(content -> findQuestion.setContent(content));

        return questionRepository.save(findQuestion);
    }

    public Question findQuestion(long id)
    {
        Question findQuestion = findVerifiedQuestion(id);
        return findQuestion;
    }

    public Page<Question> findQuestions(int page, int size)
    {
        PageRequest pageRequest = PageRequest.of(page,size, Sort.by("id").descending());
        return questionRepository.findAll(pageRequest);
    }

    public void removeQuestion(long id)
    {
        // 존재하는지 확인

        questionRepository.deleteById(id);
    }

    public Question findVerifiedQuestion(long id)
    {
        Optional<Question> optional = questionRepository.findById(id);

        Question question = optional.orElseThrow(()-> new RuntimeException("존재하지 않는 질문"));

        return question;
    }

    private void verifyQuestion(Question question)
    {
        memberService.findVerifiedMember(question.getMember().getMemberId());
    }
}