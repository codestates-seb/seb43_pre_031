package com.example.demo.question;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class QuestionMapper {
    public Question questionPostDtoToQuestion(QuestionDto.Post dto)
    {
        return new Question(dto.getTitle(),dto.getContent());
    }

    public Question questionPatchDtoToQuestion(QuestionDto.Patch dto)
    {
        return new Question(dto.getId(),dto.getTitle(),dto.getContent());
    }

    public QuestionDto.Response questionToQuestionResponseDto(Question question)
    {
        return new QuestionDto.Response(question.getId(),question.getTitle(),question.getContent());
    }

    public List<QuestionDto.Response> questionsToQuestionResponseDtos(List<Question> questions)
    {
        List<QuestionDto.Response> responses = new ArrayList<>();

        questions.stream()
                .forEach(question -> {
                    QuestionDto.Response response = questionToQuestionResponseDto(question);
                    responses.add(response);
                });

        return responses;
    }
}
