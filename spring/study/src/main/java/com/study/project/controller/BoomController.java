package com.study.project.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BoomController {
  @GetMapping("/boom")
  public void boom() {
    throw new RuntimeException("테스트 예외");
  }
}