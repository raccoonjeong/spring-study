package com.example.demo.controller;

import com.example.demo.model.MemberUserDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@Slf4j
public class HomeController {
    @GetMapping
    public String getRoot() {
        return "redirect:/home";
    }

    @GetMapping("/home")
    public String getHome() {
            return "home";
    }

    @GetMapping("/home/1")
    public String getMembersUserDetails(Model model, @AuthenticationPrincipal UserDetails userDetails) {
        log.info("{}", userDetails);
        return "home";
    }

    @GetMapping("/home/2")
    public String getMembersMemberUserDetails(Model model, @AuthenticationPrincipal MemberUserDetails userDetails) {
        log.info("{}", userDetails);
        return "home";
    }
}
