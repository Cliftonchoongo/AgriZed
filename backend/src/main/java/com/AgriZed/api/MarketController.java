package com.AgriZed.api;

import com.AgriZed.model.Market;
import com.AgriZed.service.DataStore;
import com.google.gson.Gson;
import io.javalin.Javalin;

public class MarketController {

    private static DataStore store = DataStore.getInstance();
    private static Gson gson = new Gson();

    public static void registerRoutes(Javalin app) {

        // POST /markets - Create a new market
        app.post("/markets", ctx -> {
            Market market = gson.fromJson(ctx.body(), Market.class);
            if (market.getId() == null || market.getName() == null) {
                ctx.status(400).json("{\"error\": \"id and name are required\"}");
                return;
            }
            store.addMarket(market);
            ctx.status(201).json(market);
        });

        // GET /markets - Get all markets
        app.get("/markets", ctx -> {
            ctx.json(store.getMarkets());
        });

        // GET /markets/{id}/summary - Get all prices at a market
        app.get("/markets/{id}/summary", ctx -> {
            String id = ctx.pathParam("id");
            Market market = store.findMarketById(id);
            if (market == null) {
                ctx.status(404).json("{\"error\": \"Market not found\"}");
                return;
            }
            var prices = store.getPriceEntries().stream()
                    .filter(p -> p.getMarket().getId().equals(id))
                    .filter(p -> !p.isStale())
                    .toList();
            ctx.json(prices);
        });
    }
}