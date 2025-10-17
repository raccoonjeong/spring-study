package com.example.demo.controller;

import com.example.demo.model.Member;
import com.example.demo.model.MemberUserDetails;
import com.example.demo.model.Product;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;
import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ProductController {
    private List<Product> products = List.of(
            new Product(1L, "애플와치", "애플에서 출시한 스마트와치"),
            new Product(2L, "갤럭시와치", "삼성에서 출시한 스마트와치"),
            new Product(1L, "미밴드", "샤오미에서 출시한 스마트밴드")
    );

    @GetMapping("/product/list")
    public String getMembers(Model model) {
        model.addAttribute("products", products);
        return "product-list";
    }
}
