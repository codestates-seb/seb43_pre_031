package com.example.demo.answer;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface AnswerMapper {
    Answer answerPostDtoToAnswer(AnswerDto.Post requestBody);
    Answer answerPatchDtoToAnswer(AnswerDto.Patch requestBody);
    AnswerDto.Response answerToAnswerResponseDto(Answer answer);
    List<AnswerDto.Response> answerToAnswerResponseDtos(List<Answer> answer);
}
