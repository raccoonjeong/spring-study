package com.example.demo;

import org.springframework.stereotype.Component;

@Component
public class DripCoffeeMachine implements CoffeeMachine{

    @Override
    public String brew() {
        return "Brewing coffee with Drip Coffee Machine";
    }
}

