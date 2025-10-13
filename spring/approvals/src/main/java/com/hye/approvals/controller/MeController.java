package com.hye.approvals.controller;

import com.hye.approvals.dto.ResponseDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class MeController {

    @GetMapping("/health")
    public String health() {
        return "OK";
    }

    @GetMapping("/me")
    public ResponseDTO<?> me(@RequestAttribute("userId") String userId,
                             @RequestAttribute("empName") String empName,
                             @RequestAttribute("levelNo") Integer levelNo) {

        ResponseDTO<Map<String,Object>> response = new ResponseDTO<>();
        response.setStatus("succ");
        response.setData(Map.of(
                "userId", userId,
                "empName", empName,
                "levelNo", levelNo
        ));
        return response;

    }}