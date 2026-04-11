package com.AgriZed.model;

import java.time.LocalDateTime;

public class PriceEntry {

    private String id;
    private Commodity commodity;
    private Market market;
    private double price;
    private String unit;
    private LocalDateTime dateSubmitted;
    private String submittedBy;

    public PriceEntry(String id, Commodity commodity, Market market, double price, String unit, String submittedBy) {
        this.id = id;
        this.commodity = commodity;
        this.market = market;
        this.price = price;
        this.unit = unit;
        this.submittedBy = submittedBy;
        this.dateSubmitted = LocalDateTime.now();
    }

    // Getters
    public String getId() { return id; }
    public Commodity getCommodity() { return commodity; }
    public Market getMarket() { return market; }
    public double getPrice() { return price; }
    public LocalDateTime getDateSubmitted() { return dateSubmitted; }
    public String getSubmittedById() { return submittedBy; }

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