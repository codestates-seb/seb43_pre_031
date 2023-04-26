package com.example.demo.question;

import com.example.demo.answer.AnswerService;
import com.example.demo.exception.BusinessLogicException;
import com.example.demo.exception.ExceptionCode;
import com.example.demo.member.Member;
import com.example.demo.member.MemberRepository;
import com.example.demo.member.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * 기본 CRUD메서드 구현
 */

@Transactional
@Service
public class QuestionService {

    private QuestionRepository questionRepository;
    private MemberService memberService;
    private AnswerService answerService;
    private MemberRepository memberRepository;

    public QuestionService(QuestionRepository questionRepository,
                           MemberService memberService,
                           AnswerService answerService,
                           MemberRepository memberRepository)
    {
        this.questionRepository = questionRepository;
        this.memberService = memberService;
        this.answerService = answerService;
        this.memberRepository = memberRepository;
    }
    public Question createQuestion(Question question)
    {
        // 검증 : 이미 등록된 질문인지
        // 필요한가?

        //회원이름으로 회원이 존재하는지 확인
        //verifyQuestion(question);

        return questionRepository.save(question);
    }

    public Question updateQuestion(Question question, Long id, String email)
    {
        Question findQuestion = findVerifiedQuestion(id);

        if(!findQuestion.getMember().getEmail().equals(email))
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_EDIT);

        Optional.ofNullable(question.getTitle()).ifPresent(title -> findQuestion.setTitle(title));
        Optional.ofNullable(question.getContent()).ifPresent(content -> findQuestion.setContent(content));
        Optional.ofNullable(question.getAskedAt()).ifPresent(asked_at -> findQuestion.setAskedAt(asked_at));
        Optional.ofNullable(question.getModifiedAt()).ifPresent(modified_at -> findQuestion.setModifiedAt(modified_at));
        Optional.ofNullable(question.getTags()).ifPresent(tags -> findQuestion.setTags(tags));

        return questionRepository.save(findQuestion);
    }

    public Question findQuestion(long id)
    {
        Question findQuestion = findVerifiedQuestion(id);

//      question 필드에 answer가 존재해서 DB에서 저장된 question을 찾아올때 answer를 찾는 쿼리문도 함께보냄
//        answerService.findAnswers(id).stream().forEach(answer -> {findQuestion.addAnswer(answer);
//            System.out.println(answer.getQuestion().getId());});

        return findQuestion;
    }

    public Page<Question> findQuestions(int page, int size)
    {
        PageRequest pageRequest = PageRequest.of(page,size, Sort.by("id").descending());
        return questionRepository.findAllByQuestionStatus(Question.QuestionStatus.QUESTION_POST, pageRequest);
    }

    public void removeQuestion(long id, String email)
    {
        // 존재하는지 확인
        Question findQuestion = findVerifiedQuestion(id);
        if(!findQuestion.getMember().getEmail().equals(email))
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_EDIT);

        findQuestion.setQuestionStatus(Question.QuestionStatus.QUESTION_DELETE);
        questionRepository.save(findQuestion);
    }

    public Question updateQuestionVote(String upAndDown, long questionId)
    {
        Question findQuestion = findVerifiedQuestion(questionId);

        if(upAndDown.equals("up")) findQuestion.setVotes(findQuestion.getVotes()+1);
        else findQuestion.setVotes(findQuestion.getVotes()-1);

        return questionRepository.save(findQuestion);
    }

    public Page<Question> searchQuestions(String keyword, int page, int size) {
//        List<Question> questions = questionRepository.findByTitleContaining(keyword);
        PageRequest pageRequest = PageRequest.of(page,size, Sort.by("askedAt").descending());

        return questionRepository.findByTitleContaining(pageRequest, keyword);
    }

    public Question findVerifiedQuestion(long id)
    {
        Optional<Question> optional = questionRepository.findById(id);

        Question question = optional.orElseThrow(()-> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        return question;
    }

    private void verifyQuestion(Question question)
    {
        memberService.findVerifiedMember(question.getMember().getMemberId());
    }

}
