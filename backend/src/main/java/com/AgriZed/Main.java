package com.AgriZed;

import io.javalin.Javalin;

public class Main {
    public static void main(String[] args) {
        Javalin app = Javalin.create(config -> {
            config.bundledPlugins.enableCors(cors -> {
                cors.addRule(it -> it.anyHost());
            });
        }).start(7070);

        app.get("/", ctx -> ctx.result("AgriZed API is running!"));

        System.out.println("AgriZed API started on port 7070");
    }
}