package com.example.demo.controller;

import com.example.demo.dto.MemberRequest;
import com.example.demo.dto.MemberResponse;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DisplayName("사용자 컨트롤러 테스트")
public class MemberControllerTests {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("사용자 생성 테스트")
    public void create() throws Exception {
        // prepare MemberRequest for creation
        MemberRequest memberRequest = MemberRequest.builder()
                .name("윤서준")
                .email("SeojunYoon@hanbit.co.kr")
                .age(10).build();

        // prepare json string from memberRequest
        String requestString = objectMapper.writeValueAsString(memberRequest);

        // prepare request builder
        RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/members")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .content(requestString);

        // request to MockMvc and validate status code
        MvcResult mvcResult = mockMvc.perform(requestBuilder)
                .andExpect(status().is2xxSuccessful())
                .andReturn();

        // parse response body as MemberResponse object
        MemberResponse memberResponse = objectMapper.readValue(mvcResult.getResponse().getContentAsByteArray(), MemberResponse.class);

        // validate memberResponse
        assertThat(memberResponse).isNotNull();
        assertThat(memberResponse.getId()).isGreaterThan(0);
        assertThat(memberResponse.getName()).isEqualTo("윤서준");
    }
}
