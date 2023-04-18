package com.example.demo.question;

import com.example.demo.answer.Answer;
import com.example.demo.member.Member;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class QuestionMapper {
    public Question questionPostDtoToQuestion(QuestionDto.Post dto)
    {
        Question question = new Question();
        Member member = new Member();
        member.setMemberId(dto.getMemberId());

        question.setTitle(dto.getTitle());
        question.setContent(dto.getContent());
        question.setMember(member);
        question.addAnswer(new Answer());

        return question;
    }

    public Question questionPatchDtoToQuestion(QuestionDto.Patch dto)
    {
        return new Question(dto.getId(),dto.getTitle(),dto.getContent(),new Member(),new ArrayList<>());
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
