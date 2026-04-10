package com.AgriZed.model;

import java.time.LocalDateTime;

public class PriceEntry {

    private String id;
    private Commodity commodity;
    private Market market;
    private double price;
    private LocalDateTime dateSubmitted;
    private String submittedById;

    public PriceEntry(String id, Commodity commodity, Market market, double price, String submittedById) {
        this.id = id;
        this.commodity = commodity;
        this.market = market;
        this.price = price;
        this.submittedById = submittedById;
        this.dateSubmitted = LocalDateTime.now();
    }

    // Getters
    public String getId() { return id; }
    public Commodity getCommodity() { return commodity; }
    public Market getMarket() { return market; }
    public double getPrice() { return price; }
    public LocalDateTime getDateSubmitted() { return dateSubmitted; }
    public String getSubmittedById() { return submittedById; }

    // Setters
    public void setPrice(double price) { this.price = price; }

    // Check if price is stale (older than 7 days)
    public boolean isStale() {
        return dateSubmitted.isBefore(LocalDateTime.now().minusDays(7));
    }

    // Polymorphic price formatting
    public String getFormattedPrice() {
        return commodity.formatPrice(price);
    }

    @Override
    public String toString() {
        return "PriceEntry{id='" + id + "', commodity=" + commodity.getName() +
                ", market=" + market.getName() + ", price=" + price + "}";
    }
}