package com.example.demo.answer;

import com.example.demo.exception.BusinessLogicException;
import com.example.demo.exception.ExceptionCode;
import com.example.demo.member.Member;
import com.example.demo.member.MemberRepository;
import com.example.demo.question.Question;
import com.example.demo.question.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final MemberRepository memberRepository;
    private final QuestionRepository questionRepository;

    public AnswerService(AnswerRepository answerRepository, MemberRepository memberRepository, QuestionRepository questionRepository) {
        this.answerRepository = answerRepository;
        this.memberRepository = memberRepository;
        this.questionRepository = questionRepository;
    }

    public Answer createAnswer(AnswerDto.Post post, String email) {
        Question question = questionRepository.findById(post.getQuestion_id()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Answer answer = new Answer();
        answer.setContent(post.getContent());
        answer.setQuestion(question);
        answer.setMember(member);

        return answerRepository.save(answer);
    }

    public Answer updateAnswer(Answer answer, long id, String email) {
        Answer findAnswer = findAnswer(id);

        if (!findAnswer.getMember().getEmail().equals(email)) throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_EDIT);

        Optional.ofNullable(answer.getContent()).ifPresent(content -> findAnswer.setContent(content));
        findAnswer.setModified_at(LocalDateTime.now());

        return answerRepository.save(findAnswer);
    }

    public Answer findAnswer(long id) {
        Optional<Answer> optionalAnswer = answerRepository.findById(id);
        Answer findAnswer = optionalAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

        return findAnswer;
    }

    public Page<Answer> findAnswers(int page, int size) {
        return answerRepository.findAll(PageRequest.of(page,size, Sort.by("id").descending()));
    }

    /**
     * 작성자: 한재영
     */
    public List<Answer> findAnswers(long questionId)
    {
        Optional<List<Answer>> optional = answerRepository.findAllByQuestionId(questionId);

        List<Answer> answers = optional.orElse(null);

        return answers;
    }

    public void deleteAnswer(long id, String email) {
        Answer findAnswer = findAnswer(id);
        if (!findAnswer.getMember().getEmail().equals(email)) throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_EDIT);

        answerRepository.delete(findAnswer);
    }

}
