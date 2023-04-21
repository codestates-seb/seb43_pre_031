package com.example.demo.answer;

import com.example.demo.member.Member;
import com.example.demo.question.Question;
import com.google.gson.Gson;
import org.apache.catalina.security.SecurityConfig;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = AnswerController.class, excludeAutoConfiguration = SecurityAutoConfiguration.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class AnswerControllerRestDocsTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private AnswerService answerService;
    @MockBean
    private AnswerMapper mapper;

    @Test
    public void postAnswerTest() throws Exception {
        AnswerDto.Post post = new AnswerDto.Post(1L, "a@a","post content");
        String content = gson.toJson(post);
        Answer mockResultAnswer = new Answer(1L,"content", Answer.AnswerStatus.ANSWER_VALID,new Member(),new Question());

        given(mapper.answerPostDtoToAnswer(Mockito.any(AnswerDto.Post.class))).willReturn(new Answer());
        given(answerService.createAnswer(Mockito.any(AnswerDto.Post.class), Mockito.anyString())).willReturn(mockResultAnswer);

        ResultActions actions =
                mockMvc.perform(
                        post("/answers")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        actions.andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/answers"))))
                .andDo(
                        document("post-answer",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                List.of(
                                        fieldWithPath("question_id").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("답변자 이메일"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("답변 내용")
                                )
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                        )
                ));
    }

    @Test
    public void patchAnswerTest() throws Exception {
        Long id = 1L;
        AnswerDto.Patch patch = new AnswerDto.Patch(id,"patch content");
        String content = gson.toJson(patch);

        AnswerDto.Response response = new AnswerDto.Response(id,1,1,"홍길동","patch content" ,LocalDateTime.now(), LocalDateTime.now(), Answer.AnswerStatus.ANSWER_VALID);

        given(mapper.answerPatchDtoToAnswer(Mockito.any(AnswerDto.Patch.class))).willReturn(new Answer());
        given(answerService.updateAnswer(Mockito.any(Answer.class),Mockito.anyLong())).willReturn(new Answer());
        given(mapper.answerToAnswerResponseDto(Mockito.any(Answer.class))).willReturn(response);

        ResultActions actions =
                mockMvc.perform(
                        patch("/answers/{id}", id)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        actions.andExpect(status().isOk())
                .andExpect(jsonPath("id").value(patch.getId()))
                .andExpect(jsonPath("content").value(patch.getContent()))
                .andDo(document("patch-answer",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(parameterWithName("id").description("답변 식별자")),
                                requestFields(List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("답변 식별자").ignored(),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("답변 내용")
                                )),
                                responseFields(List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("답변 식별자"),
                                        fieldWithPath("question_id").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("member_id").type(JsonFieldType.NUMBER).description("답변자 id"),
                                        fieldWithPath("memberName").type(JsonFieldType.STRING).description("답변자 이름"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("created_at").type(JsonFieldType.STRING).description("답변 생성일"),
                                        fieldWithPath("modified_at").type(JsonFieldType.STRING).description("답변 수정일"),
                                        fieldWithPath("status").type(JsonFieldType.STRING).description("답변 상태: 등록됨 / 삭제됨")

                                ))
                        )
                );
    }

    @Test
    public void getAnswerTest() throws Exception {
        Long id = 1L;
        AnswerDto.Response response = new AnswerDto.Response(id,1,1, "홍길동", "content", LocalDateTime.now(), LocalDateTime.now(), Answer.AnswerStatus.ANSWER_VALID);

        given(answerService.findAnswer(Mockito.anyLong())).willReturn(new Answer());
        given(mapper.answerToAnswerResponseDto(Mockito.any(Answer.class))).willReturn(response);

        ResultActions actions = mockMvc.perform(get("/answers/{id}", id).accept(MediaType.APPLICATION_JSON));

        actions.andExpect(status().isOk())
                .andDo(
                        document("get-answer",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                                pathParameters(parameterWithName("id").description("답변 식별자")),
                                responseFields(List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("답변 식별자"),
                                        fieldWithPath("question_id").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("member_id").type(JsonFieldType.NUMBER).description("답변자 id"),
                                        fieldWithPath("memberName").type(JsonFieldType.STRING).description("답변자 이름"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("created_at").type(JsonFieldType.STRING).description("답변 생성일"),
                                        fieldWithPath("modified_at").type(JsonFieldType.STRING).description("답변 수정일"),
                                        fieldWithPath("status").type(JsonFieldType.STRING).description("답변 상태: 등록됨 / 삭제됨")
                                ))
                        )
                );
    }

    @Test
    public void getAnswersTest() throws Exception {
        Answer answer1 = new Answer(1L, "Content", Answer.AnswerStatus.ANSWER_VALID,new Member(),new Question());
        Answer answer2 = new Answer(2L, "Content", Answer.AnswerStatus.ANSWER_VALID,new Member(),new Question());
        AnswerDto.Response response1 = new AnswerDto.Response(1L,1,1, "홍길동1", "content1", LocalDateTime.now(), LocalDateTime.now(), Answer.AnswerStatus.ANSWER_VALID);
        AnswerDto.Response response2 = new AnswerDto.Response(2L,2,2, "홍길동2", "content2", LocalDateTime.now(), LocalDateTime.now(), Answer.AnswerStatus.ANSWER_VALID);

        Page<Answer> pageAnswers = new PageImpl<>(List.of(answer1, answer2));
        List<AnswerDto.Response> responses = Arrays.asList(response1, response2);

        given(answerService.findAnswers(Mockito.anyInt(),Mockito.anyInt())).willReturn(pageAnswers);
        given(mapper.answerToAnswerResponseDtos(Mockito.anyList())).willReturn(responses);

        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders.get("/answers")
                        .param("page", "1")
                        .param("size", "10")
                        .accept(MediaType.APPLICATION_JSON)
        );

        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.data.*", hasSize(2)))
                .andDo(
                        document("get-answers",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestParameters(List.of(
                                        parameterWithName("page").description("페이지 번호"),
                                        parameterWithName("size").description("페이지 당 답변 수")
                                )),
                                responseFields(List.of(
                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("응답 데이터"),
                                        fieldWithPath("data[].id").type(JsonFieldType.NUMBER).description("답변 식별자"),
                                        fieldWithPath("data[].question_id").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("data[].member_id").type(JsonFieldType.NUMBER).description("답변자 id"),
                                        fieldWithPath("data[].memberName").type(JsonFieldType.STRING).description("답변자 이름"),
                                        fieldWithPath("data[].content").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("data[].created_at").type(JsonFieldType.STRING).description("답변 생성일"),
                                        fieldWithPath("data[].modified_at").type(JsonFieldType.STRING).description("답변 수정일"),
                                        fieldWithPath("data[].status").type(JsonFieldType.STRING).description("답변 상태: 등록됨 / 삭제됨"),
                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("페이지 번호"),
                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("전체 답변 수"),
                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("전체 페이지 수")
                                ))
                        )
                );
    }

    @Test
    public void deleteAnswerTest() throws Exception {
        Long id = 1L;

        doNothing().when(answerService).deleteAnswer(Mockito.anyLong());

        ResultActions actions =
                mockMvc.perform(
                        delete("/answers/{id}", id)
                                .accept(MediaType.APPLICATION_JSON)
                );

        actions.andExpect(status().isNoContent())
                .andDo(
                        document("delete-answer",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(parameterWithName("id").description("답변 식별자"))
                        )
                );
    }
}

