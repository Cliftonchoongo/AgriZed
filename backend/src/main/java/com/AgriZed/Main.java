package com.AgriZed;

import com.AgriZed.api.CommodityController;
import com.AgriZed.api.MarketController;
import com.AgriZed.api.PriceController;
import com.AgriZed.api.UserController;
import io.javalin.Javalin;

public class Main {
    public static void main(String[] args) {
        Javalin app = Javalin.create(config -> {
            config.bundledPlugins.enableCors(cors -> {
                cors.addRule(it -> it.anyHost());
            });
        }).start(7070);

        MarketController.registerRoutes(app);
        CommodityController.registerRoutes(app);
        PriceController.registerRoutes(app);
        UserController.registerRoutes(app);

        app.get("/", ctx -> ctx.result("AgriZed API is running!"));

        app.exception(Exception.class, (e, ctx) -> {
            ctx.status(500).json("{\"error\": \"" + e.getMessage() + "\", \"timestamp\": \"" + java.time.LocalDateTime.now() + "\"}");
        });

        System.out.println("AgriZed API started on port 7070");
    }
}