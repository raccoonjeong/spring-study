package com.woori.project;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    public HelloController() {
        System.out.println("HelloController 생성");
    }
}
