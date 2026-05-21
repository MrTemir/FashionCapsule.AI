package com.example.demo;

import me.paulschwarz.springdotenv.DotenvPropertySource;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
        // Добавьте эту строку для поддержки .env
		SpringApplication.run(DemoApplication.class, args);
	}

}