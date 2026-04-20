package com.AgriZed.api;

import com.AgriZed.model.*;
import com.AgriZed.service.DataStore;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.javalin.Javalin;

public class UserController {

    private static DataStore store = DataStore.getInstance();
    private static Gson gson = new Gson();

    public static void registerRoutes(Javalin app) {

        // POST /users/register
        app.post("/users/register", ctx -> {
            JsonObject body = gson.fromJson(ctx.body(), JsonObject.class);
            String type = body.get("type").getAsString();
            String id = body.get("id").getAsString();
            String name = body.get("name").getAsString();
            String email = body.get("email").getAsString();
            String province = body.get("province").getAsString();

            User user;
            switch (type.toLowerCase()) {
                case "farmer":
                    String farmLocation = body.get("farmLocation").getAsString();
                    user = new Farmer(id, name, email, province, farmLocation);
                    break;
                case "buyer":
                    String companyName = body.get("companyName").getAsString();
                    user = new Buyer(id, name, email, province, companyName);
                    break;
                case "analyst":
                    String organisation = body.get("organisation").getAsString();
                    user = new Analyst(id, name, email, province, organisation);
                    break;
                default:
                    ctx.status(400).json("{\"error\": \"Invalid type. Use farmer, buyer or analyst\"}");
                    return;
            }
            store.addUser(user);
            ctx.status(201).json(user);
        });

        // GET /users - Get all users
        app.get("/users", ctx -> {
            ctx.json(store.getUsers());
        });
    }
}