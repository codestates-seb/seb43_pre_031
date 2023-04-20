package com.example.demo.answer;

import com.example.demo.exception.BusinessLogicException;
import com.example.demo.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;

    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    public Answer createAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    public Answer updateAnswer(Answer answer) {
        Answer findAnswer = findAnswer(answer.getId());

        Optional.ofNullable(answer.getContent()).ifPresent(content -> findAnswer.setContent(content));
        //findAnswer.setModified_at(LocalDateTime.now());

        return answerRepository.save(findAnswer);
    }

    public Answer findAnswer(long id) {
        Optional<Answer> optionalAnswer = answerRepository.findById(id);
        Answer findAnswer = optionalAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

        return findAnswer;
    }

    public Page<Answer> findAnswers(int page, int size) {
        return answerRepository.findAll(PageRequest.of(page, size, Sort.by("modified_at")));
    }

    public void deleteAnswer(long id) {
        Answer findAnswer = findAnswer(id);

        answerRepository.delete(findAnswer);
    }

}
