package com.AgriZed.model;

public abstract class Commodity {

    private String id;
    private String name;
    private String description;
    private String unit;

    public Commodity(String id, String name, String description, String unit) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.unit = unit;
    }

    // Getters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getUnit() { return unit; }

    // Setters
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }

    // Abstract method - each commodity formats its price differently
    public abstract String formatPrice(double price);

    @Override
    public String toString() {
        return "Commodity{id='" + id + "', name='" + name + "', unit='" + unit + "'}";
    }
}