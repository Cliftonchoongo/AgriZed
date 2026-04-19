package com.AgriZed;

import com.AgriZed.api.CommodityController;
import com.AgriZed.api.MarketController;
import com.AgriZed.api.PriceController;
import io.javalin.Javalin;

public class Main {
    public static void main(String[] args) {

        Javalin app = Javalin.create(config -> {
            config.bundledPlugins.enableCors(cors -> {
                cors.addRule(it -> it.anyHost());
            });
        }).start(7070);

        // Test route
        app.get("/", ctx -> ctx.result("AgriZed API is running!"));

        // Register API routes
        MarketController.registerRoutes(app);
        CommodityController.registerRoutes(app);
        PriceController.registerRoutes(app);

        System.out.println("AgriZed API started on port 7070");
    }
}