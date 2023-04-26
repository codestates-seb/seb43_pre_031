package com.example.demo.question;

import com.example.demo.answer.Answer;
import com.example.demo.answer.AnswerDto;
import com.example.demo.member.Member;
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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.example.demo.utils.ApiDocumentUtils.getRequestPreProcessor;
import static com.example.demo.utils.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * 기본 테스트 - Security 배제하고 진행
 */

@WebMvcTest(controllers = QuestionController.class,
        excludeAutoConfiguration = SecurityAutoConfiguration.class,
        excludeFilters = {
            @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)
})
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class QuestionControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private QuestionService questionService;

    @MockBean
    private QuestionMapper mapper;

    @Autowired
    private Gson gson;

//    @Test
//    //@WithMockUser
//    public void postQuestionTest() throws Exception
//    {
//        //given
//        QuestionDto.Post postDto = new QuestionDto.Post("title","content","등록일","Name",List.of("a","b","c"));
//        String content = gson.toJson(postDto);
//        Member member = new Member();
//        member.setMemberId(1L);
//        Question mockResultQuestion = new Question("test","test","등록일","[\"java\"]");
//        mockResultQuestion.setId(1L);
//
//        given(mapper.questionPostDtoToQuestion(Mockito.any(QuestionDto.Post.class))).willReturn(new Question());
//        given(questionService.createQuestion(Mockito.any(Question.class),Mockito.anyString())).willReturn(mockResultQuestion);
//
//        //when
//        ResultActions actions =
//                mockMvc.perform(
//                        post("/questions")
//                                //.with(csrf())
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(content)
//                );
//
//        //then
//        actions
//                .andExpect(status().isCreated())
//                .andDo(
//                        document(
//                                "post-question",
//                                getRequestPreProcessor(),
//                                getResponsePreProcessor(),
//                                requestFields(List.of(
//                                        fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목"),
//                                        fieldWithPath("content").type(JsonFieldType.STRING).description("질문 내용"),
//                                        fieldWithPath("asked_at").type(JsonFieldType.STRING).description("질문 등록일"),
//                                        fieldWithPath("member").type(JsonFieldType.STRING).description("질문 작성자 이름"),
//                                        fieldWithPath("tags").type(JsonFieldType.ARRAY).description("태그")
//                                )),
//                                responseHeaders(
//                                        headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
//                                )
//                        )
//                );
//    }

    @Test
    //@WithMockUser
    public void patchQuestionTest() throws Exception
    {
        //given
        Long id = 1L;
        QuestionDto.Patch patch = new QuestionDto.Patch("test", "content","수정일","userName",List.of("a","b","c"));
        String content = gson.toJson(patch);

        QuestionDto.Response response = new QuestionDto.Response(
                1L,"test", "test","2023-04-19 16:11:11","2023-04-20 11:22:33",1L,"김코딩",new ArrayList<>());

        given(mapper.questionPatchDtoToQuestion(Mockito.any(QuestionDto.Patch.class))).willReturn(new Question());
        given(questionService.updateQuestion(Mockito.any(Question.class),anyLong())).willReturn(new Question());
        given(mapper.questionToQuestionResponseDto(Mockito.any(Question.class))).willReturn(response);


        //when

        ResultActions actions =
                mockMvc.perform(
                        patch("/questions/{id}",id)
                                //.with(csrf())
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value(patch.getTitle()))
                .andDo(
                        document(
                                "patch-question",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(parameterWithName("id").description("질문 식별자")),
                                requestFields(List.of(
                                        //fieldWithPath("id").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("질문 내용"),
                                        fieldWithPath("modified_at").type(JsonFieldType.STRING).description("질문 수정일"),
                                        fieldWithPath("member").type(JsonFieldType.STRING).description("질문 작성자 이름"),
                                        fieldWithPath("tags").type(JsonFieldType.ARRAY).description("질문 태그")
                                )),
                                responseFields(List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("질문 내용"),
                                        fieldWithPath("asked_at").type(JsonFieldType.STRING).description("질문 등록일"),
                                        fieldWithPath("modified_at").type(JsonFieldType.STRING).description("질문 수정일"),
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("질문 작성자 id"),
                                        fieldWithPath("member").type(JsonFieldType.STRING).description("질문 작성자 이름"),
                                        fieldWithPath("tags").type(JsonFieldType.ARRAY).description("태그")
                                ))
                        )
                );
    }

    @Test
    //@WithMockUser
    public void getQuestionTest() throws Exception
    {
        //given
        Long id = 1L;
        Question question = new Question();
        question.setId(1L);
        List<AnswerDto.Response> answers = new ArrayList<>();

        for(long i = 1L; i<5L; i++)
        {
            AnswerDto.Response answer = new AnswerDto.Response(
                    i,1L,i,
                    "test","content",  LocalDateTime.now(), LocalDateTime.now(),
                    Answer.AnswerStatus.ANSWER_VALID);
            answers.add(answer);
        }

        QuestionDto.ResponseWithAnswers response = new QuestionDto.ResponseWithAnswers(
                1L,"test", "test",
                "2023-04-19 16:11:11","2023-04-20 11:22:33",
                1L,"김코딩", List.of("a","b","c"),
                answers);

        given(questionService.findQuestion(Mockito.anyLong())).willReturn(new Question());
        given(mapper.questionToQuestionResponseWithAnswersDto(Mockito.any(Question.class))).willReturn(response);

        //when
        ResultActions actions =
                mockMvc.perform(
                        get("/questions/{id}",id)
                                .accept(MediaType.APPLICATION_JSON)
                );

        //then
        actions
                .andExpect(status().isOk())
                .andDo(
                        document(
                                "get-question",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(parameterWithName("id").description("질문 식별자")),
                                responseFields(List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("질문 내용"),
                                        fieldWithPath("asked_at").type(JsonFieldType.STRING).description("질문 등록일"),
                                        fieldWithPath("modified_at").type(JsonFieldType.STRING).description("질문 수정일"),
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("질문 작성자 id"),
                                        fieldWithPath("member").type(JsonFieldType.STRING).description("질문 작성자 이름"),
                                        fieldWithPath("tags").type(JsonFieldType.ARRAY).description("태그"),
                                        fieldWithPath("answers").type(JsonFieldType.ARRAY).description("답변 리스트"),
                                        fieldWithPath("answers[].id").type(JsonFieldType.NUMBER).description("답변 식별자"),
                                        fieldWithPath("answers[].question_id").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("answers[].member_id").type(JsonFieldType.NUMBER).description("답변 작성자 id"),
                                        fieldWithPath("answers[].memberName").type(JsonFieldType.STRING).description("답변 작성자 이름"),
                                        fieldWithPath("answers[].content").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("answers[].created_at").type(JsonFieldType.STRING).description("답변 등록일"),
                                        fieldWithPath("answers[].modified_at").type(JsonFieldType.STRING).description("답변 수정일"),
                                        fieldWithPath("answers[].status").type(JsonFieldType.STRING).description("답변 상태")
                                ))
                        )
                );
    }

    @Test
    //@WithMockUser
    public void getQuestionsTest() throws Exception
    {
        List<Question> questions = new ArrayList<>();
        for(Long i = 1L; i<=5L; i++) questions.add(new Question(i,"test","test", "test", "test"));
        List<QuestionDto.Response> responses = new ArrayList<>();
        for(Long i = 5L; i>=1L; i--) responses.add(new QuestionDto.Response(i,"test", "test","2023-04-19 16:11:11","2023-04-20 11:22:33",1L,"김코딩",List.of("a","b","c")));


//        int page = 2, size = 2;
//        PageRequest pageRequest = PageRequest.of(page-1,size, Sort.by("id").descending());

        String page = "1", size = "5";
        MultiValueMap<String,String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("page",page);
        queryParams.add("size",size);

        given(questionService.findQuestions(Mockito.anyInt(),Mockito.anyInt())).willReturn(new PageImpl<>(questions));
        given(mapper.questionsToQuestionResponseDtos(Mockito.anyList())).willReturn(responses);

        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders.get("/questions")
                        .params(queryParams)
                        .accept(MediaType.APPLICATION_JSON)
        );

        actions
                .andExpect(status().isOk())
                .andDo(
                        document(
                                "get-questions",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                requestParameters(List.of(
                                        parameterWithName("page").description("page 번호"),
                                        parameterWithName("size").description("page size")
                                )),
                                responseFields(
                                        List.of(
                                                fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                                fieldWithPath("data[].id").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                                fieldWithPath("data[].title").type(JsonFieldType.STRING).description("질문 제목"),
                                                fieldWithPath("data[].content").type(JsonFieldType.STRING).description("질문 내용"),
                                                fieldWithPath("data[].asked_at").type(JsonFieldType.STRING).description("질문 등록일"),
                                                fieldWithPath("data[].modified_at").type(JsonFieldType.STRING).description("질문 수정일"),
                                                fieldWithPath("data[].memberId").type(JsonFieldType.NUMBER).description("질문 작성자 id"),
                                                fieldWithPath("data[].member").type(JsonFieldType.STRING).description("질문 작성자 이름"),
                                                fieldWithPath("data[].tags").type(JsonFieldType.ARRAY).description("태그"),
                                                fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                                fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("페이지 번호"),
                                                fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                                fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("전체 질문 수"),
                                                fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("전체 페이지 수")
                                ))
                        )
                );
    }

    @Test
    public void searchQuestionsTest() throws Exception {
        List<Question> questions = new ArrayList<>();
        for(Long i = 1L; i<=5L; i++) questions.add(new Question(i,"test","test", "test", "test"));
        List<QuestionDto.Response> responses = new ArrayList<>();
        for(Long i = 5L; i>=1L; i--) responses.add(new QuestionDto.Response(i,"test", "test","2023-04-19 16:11:11","2023-04-20 11:22:33",1L,"김코딩",List.of("a","b","c")));

        String keyword = "test", page = "1", size = "5";
        MultiValueMap<String,String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("keyword", keyword);
        queryParams.add("page", page);
        queryParams.add("size", size);

        given(questionService.searchQuestions(Mockito.anyString(), Mockito.anyInt(),Mockito.anyInt())).willReturn(new PageImpl<>(questions));
        given(mapper.questionsToQuestionResponseDtos(Mockito.anyList())).willReturn(responses);

        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders.get("/questions/search")
                        .params(queryParams)
                        .accept(MediaType.APPLICATION_JSON)
        );

        actions
                .andExpect(status().isOk())
                .andDo(
                        document(
                                "get-questions",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                requestParameters(List.of(
                                        parameterWithName("keyword").description("검색어"),
                                        parameterWithName("page").description("page 번호"),
                                        parameterWithName("size").description("page size")
                                )),
                                responseFields(
                                        List.of(
                                                fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                                fieldWithPath("data[].id").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                                fieldWithPath("data[].title").type(JsonFieldType.STRING).description("질문 제목"),
                                                fieldWithPath("data[].content").type(JsonFieldType.STRING).description("질문 내용"),
                                                fieldWithPath("data[].asked_at").type(JsonFieldType.STRING).description("질문 등록일"),
                                                fieldWithPath("data[].modified_at").type(JsonFieldType.STRING).description("질문 수정일"),
                                                fieldWithPath("data[].memberId").type(JsonFieldType.NUMBER).description("질문 작성자 id"),
                                                fieldWithPath("data[].member").type(JsonFieldType.STRING).description("질문 작성자 이름"),
                                                fieldWithPath("data[].tags").type(JsonFieldType.ARRAY).description("태그"),
                                                fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                                fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("페이지 번호"),
                                                fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                                fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("전체 질문 수"),
                                                fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("전체 페이지 수")
                                        ))
                        )
                );
    }

    @Test
    //@WithMockUser
    public void deleteQuestionTest() throws Exception
    {
        //given
        Long id = 1L;
        QuestionDto.Response response = new QuestionDto.Response(1L,"test", "test","2023-04-19 16:11:11",null,1L,"김코딩",List.of("a"));

        doNothing().when(questionService).removeQuestion(Mockito.anyLong());

        //when
        ResultActions actions =
                mockMvc.perform(
                        delete("/questions/{id}",id)
                                .accept(MediaType.APPLICATION_JSON)
                                //.with(csrf())
                );

        //then
        actions
                .andExpect(status().isNoContent())
                .andDo(
                        document(
                                "delete-question",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(parameterWithName("id").description("질문 식별자"))
                        )
                );
    }
}
