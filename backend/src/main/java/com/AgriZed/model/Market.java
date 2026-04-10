package com.AgriZed.model;

public class Market {

    private String id;
    private String name;
    private String town;
    private String province;

    public Market(String id, String name, String town, String province) {
        this.id = id;
        this.name = name;
        this.town = town;
        this.province = province;
    }

    // Getters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getTown() { return town; }
    public String getProvince() { return province; }

    // Setters
    public void setName(String name) { this.name = name; }
    public void setTown(String town) { this.town = town; }
    public void setProvince(String province) { this.province = province; }

    @Override
    public String toString() {
        return "Market{id='" + id + "', name='" + name + "', town='" + town + "', province='" + province + "'}";
    }
}