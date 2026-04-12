package com.AgriZed.service;

import com.AgriZed.model.*;
import java.util.ArrayList;
import java.util.List;

public class DataStore {

    private static DataStore instance;

    private List<Market> markets = new ArrayList<>();
    private List<Commodity> commodities = new ArrayList<>();
    private List<PriceEntry> priceEntries = new ArrayList<>();
    private List<User> users = new ArrayList<>();

    private DataStore() {}

    public static DataStore getInstance() {
        if (instance == null) {
            instance = new DataStore();
        }
        return instance;
    }

    // Markets
    public List<Market> getMarkets() { return markets; }
    public void addMarket(Market market) { markets.add(market); }

    // Commodities
    public List<Commodity> getCommodities() { return commodities; }
    public void addCommodity(Commodity commodity) { commodities.add(commodity); }

    // Price Entries
    public List<PriceEntry> getPriceEntries() { return priceEntries; }
    public void addPriceEntry(PriceEntry entry) { priceEntries.add(entry); }

    // Users
    public List<User> getUsers() { return users; }
    public void addUser(User user) { users.add(user); }

    // Find by ID helpers
    public Market findMarketById(String id) {
        return markets.stream()
                .filter(m -> m.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public Commodity findCommodityById(String id) {
        return commodities.stream()
                .filter(c -> c.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public User findUserById(String id) {
        return users.stream()
                .filter(u -> u.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}