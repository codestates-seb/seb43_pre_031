package com.example.demo.question;

import com.example.demo.answer.Answer;
import com.example.demo.answer.AnswerMapper;
import com.example.demo.exception.BusinessLogicException;
import com.example.demo.exception.ExceptionCode;
import com.example.demo.member.Member;
import com.example.demo.member.MemberRepository;
import com.example.demo.member.MemberService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class QuestionMapper {
    private MemberRepository memberRepository;
    private AnswerMapper answerMapper;
    public QuestionMapper(MemberRepository memberRepository,
                          AnswerMapper answerMapper)
    {
        this.memberRepository = memberRepository;
        this.answerMapper = answerMapper;
    }
    public Question questionPostDtoToQuestion(QuestionDto.Post dto, String email)
    {
        Question question = new Question(
                dto.getTitle(),
                dto.getContent(),
                dto.getAsked_at(),
                listToString(dto.getTags())
        );
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        //Member member = memberService.findVerifiedMember(dto.getMember()); // dto로 username만 받기때문에 userService추가
        //member.setMemberId(dto.getMemberId());

        question.setMember(member);
        question.addAnswer(new Answer());

        return question;
    }

    public Question questionPatchDtoToQuestion(QuestionDto.Patch dto)
    {
        Question question = new Question(
                0L,
                dto.getTitle(),
                dto.getContent(),
                dto.getModified_at(),
                listToString(dto.getTags())
        );
        return question;
    }

    public QuestionDto.Response questionToQuestionResponseDto(Question question)
    {
        return new QuestionDto.Response(
                question.getId(),
                question.getTitle(),
                question.getContent(),
                question.getAskedAt(),
                question.getModifiedAt(),
                question.getMember().getMemberId(),
                question.getMember().getFullName(),
                stringToList(question.getTags())
        );
    }

    public QuestionDto.ResponseWithAnswers questionToQuestionResponseWithAnswersDto(Question question)
    {
        return new QuestionDto.ResponseWithAnswers(
                question.getId(),
                question.getTitle(),
                question.getContent(),
                question.getAskedAt(),
                question.getModifiedAt(),
                question.getMember().getMemberId(),
                question.getMember().getFullName(),
                stringToList(question.getTags()),
                answerMapper.answerToAnswerResponseDtos(question.getAnswers())
        );
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

    private List<String> stringToList(String str)
    {
        List<String> list = new ArrayList<>();

        Arrays.stream(str.substring(1,str.length()-1).split(","))
                .forEach(subStr -> list.add(subStr.replace("\"","")));

        return list;
    }

    private String listToString(List list)
    {
        String str = "[\"";

        str += list.get(0);
        for(int i = 1; i<list.size();i++)
        {
            str += "\", \"";
            str += list.get(i);
        }
        str += "\"]";

        return str;
    }
}
