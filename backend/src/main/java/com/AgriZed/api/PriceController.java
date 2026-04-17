package com.AgriZed.api;

import com.AgriZed.model.*;
import com.AgriZed.service.DataStore;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.javalin.Javalin;

import java.util.*;
import java.util.stream.Collectors;

public class PriceController {

    private static DataStore store = DataStore.getInstance();
    private static Gson gson = new Gson();

    public static void registerRoutes(Javalin app) {

        // POST /prices - Submit a price entry
        app.post("/prices", ctx -> {
            JsonObject body = gson.fromJson(ctx.body(), JsonObject.class);
            String id = body.get("id").getAsString();
            String commodityId = body.get("commodityId").getAsString();
            String marketId = body.get("marketId").getAsString();
            double price = body.get("price").getAsDouble();
            String unit = body.get("unit").getAsString();
            String submittedBy = body.get("submittedBy").getAsString();

            Commodity commodity = store.findCommodityById(commodityId);
            Market market = store.findMarketById(marketId);

            if (commodity == null) {
                ctx.status(404).json("{\"error\": \"Commodity not found\"}");
                return;
            }
            if (market == null) {
                ctx.status(404).json("{\"error\": \"Market not found\"}");
                return;
            }

            // Check if submitter is a Farmer and enforce province rule
            User user = store.findUserById(submittedBy);
            if (user instanceof Farmer farmer) {
                if (!farmer.canSubmitForMarket(market)) {
                    ctx.status(403).json("{\"error\": \"Farmer can only submit prices for markets in their own province\"}");
                    return;
                }
            }

            PriceEntry entry = new PriceEntry(id, commodity, market, price, unit, submittedBy);
            store.addPriceEntry(entry);
            ctx.status(201).json(entry);
        });

        // GET /prices/current - Latest price for every commodity
        app.get("/prices/current", ctx -> {
            Map<String, PriceEntry> latest = new HashMap<>();
            for (PriceEntry entry : store.getPriceEntries()) {
                String key = entry.getCommodity().getId() + "-" + entry.getMarket().getId();
                if (!latest.containsKey(key) ||
                        entry.getDateSubmitted().isAfter(latest.get(key).getDateSubmitted())) {
                    latest.put(key, entry);
                }
            }
            ctx.json(latest.values());
        });

        // GET /prices/{commodityId}/trend - Price history for a commodity
        app.get("/prices/{commodityId}/trend", ctx -> {
            String commodityId = ctx.pathParam("commodityId");
            var trend = store.getPriceEntries().stream()
                    .filter(p -> p.getCommodity().getId().equals(commodityId))
                    .sorted(Comparator.comparing(PriceEntry::getDateSubmitted))
                    .toList();
            ctx.json(trend);
        });

        // GET /prices/compare - Compare one commodity across all markets
        app.get("/prices/compare", ctx -> {
            String commodityId = ctx.queryParam("commodityId");
            String date = ctx.queryParam("date");
            var results = store.getPriceEntries().stream()
                    .filter(p -> p.getCommodity().getId().equals(commodityId))
                    .toList();
            ctx.json(results);
        });

        // GET /prices/cheapest - Cheapest market per commodity
        app.get("/prices/cheapest", ctx -> {
            Map<String, PriceEntry> cheapest = new HashMap<>();
            for (PriceEntry entry : store.getPriceEntries()) {
                String commodityId = entry.getCommodity().getId();
                if (!cheapest.containsKey(commodityId) ||
                        entry.getPrice() < cheapest.get(commodityId).getPrice()) {
                    cheapest.put(commodityId, entry);
                }
            }
            ctx.json(cheapest.values());
        });
    }
}