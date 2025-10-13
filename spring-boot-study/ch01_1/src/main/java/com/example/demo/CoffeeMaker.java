package com.example.demo;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CoffeeMaker {
    @Autowired
    private CoffeeMachine coffeeMachine;

    @PostConstruct
    public void makeCoffee() {
        System.out.println(coffeeMachine.brew());
    }
}
