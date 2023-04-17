package com.example.demo.question;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    private QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository)
    {
        this.questionRepository = questionRepository;
    }
    public Question createQuestion(Question question)
    {
        // 검증 : 이미 등록된 질문인지
        // 필요한가?

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

    public List<Question> findQuestions()
    {
        return questionRepository.findAll();
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
}
