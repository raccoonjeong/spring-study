package com.example.demo.controller;

import com.example.demo.model.Member;
import com.example.demo.model.Product;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://hanbit.co.kr, http://campus.co.kr") // this can be applied to method
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApiController {
    private List<Product> products = List.of(
            new Product(1L, "애플와치", "애플에서 출시한 스마트와치"),
            new Product(2L, "갤럭시와치", "삼성에서 출시한 스마트와치"),
            new Product(1L, "미밴드", "샤오미에서 출시한 스마트밴드")
    );

    private List<Member> members = List.of(
            new Member(1L, "윤서준", "SeojunYoon@hanbit.co.kr", null),
            new Member(2L, "윤광철", "KwangcheolYoon@hanbit.co.kr", null),
            new Member(3L, "공미영", "MiyeongKong@hanbit.co.kr", null),
            new Member(4L, "김도윤", "DoyunKim@hanbit.co.kr", null)
    );

    @GetMapping("/products")
    public List<Product> getProducts() {
        return products;
    }

    @GetMapping("/members")
    public List<Member> getMembers() {
        return members;
    }
}
