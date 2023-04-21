package com.example.demo.answer;

import com.example.demo.question.QuestionRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface AnswerMapper {

    Answer answerPostDtoToAnswer(AnswerDto.Post requestBody);
    Answer answerPatchDtoToAnswer(AnswerDto.Patch requestBody);
    @Mapping(target = "member_id", expression = "java(answer.getMember().getMemberId())")
    @Mapping(target = "question_id", expression = "java(answer.getQuestion().getId())")
    @Mapping(target = "memberName", expression = "java(answer.getMember().getFullName())")
    AnswerDto.Response answerToAnswerResponseDto(Answer answer);
    List<AnswerDto.Response> answerToAnswerResponseDtos(List<Answer> answer);
}
