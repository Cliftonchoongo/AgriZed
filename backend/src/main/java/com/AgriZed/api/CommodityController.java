package com.AgriZed.api;

import com.AgriZed.model.*;
import com.AgriZed.service.DataStore;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.javalin.Javalin;

public class CommodityController {

    private static DataStore store = DataStore.getInstance();
    private static Gson gson = new Gson();

    public static void registerRoutes(Javalin app) {

        // POST /commodities - Add a new commodity
        app.post("/commodities", ctx -> {
            JsonObject body = gson.fromJson(ctx.body(), JsonObject.class);
            String type = body.get("type").getAsString();
            String id = body.get("id").getAsString();
            String name = body.get("name").getAsString();
            String description = body.get("description").getAsString();

            Commodity commodity;

            switch (type.toLowerCase()) {
                case "grain":
                    double bagWeight = body.get("bagWeightKg").getAsDouble();
                    commodity = new GrainCommodity(id, name, description, bagWeight);
                    break;
                case "produce":
                    String measurementType = body.get("measurementType").getAsString();
                    commodity = new ProduceCommodity(id, name, description, measurementType);
                    break;
                case "livestock":
                    String animalType = body.get("animalType").getAsString();
                    commodity = new LivestockCommodity(id, name, description, animalType);
                    break;
                default:
                    ctx.status(400).json("{\"error\": \"Invalid type. Use grain, produce or livestock\"}");
                    return;
            }

            store.addCommodity(commodity);
            ctx.status(201).json(commodity);
        });

        // GET /commodities - Get all commodities
        app.get("/commodities", ctx -> {
            ctx.json(store.getCommodities());
        });
    }
}