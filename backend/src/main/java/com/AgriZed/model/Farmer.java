package com.AgriZed.model;

public class Farmer extends User {

    private String farmLocation;

    public Farmer(String id, String name, String email, String province, String farmLocation) {
        super(id, name, email, province);
        this.farmLocation = farmLocation;
    }

    public String getFarmLocation() { return farmLocation; }
    public void setFarmLocation(String farmLocation) { this.farmLocation = farmLocation; }

    @Override
    public String getRole() { return "FARMER"; }

    @Override
    public boolean canSubmitPrices() { return true; }

    @Override
    public boolean canExportData() { return false; }

    // Farmer can only submit prices for their own province
    public boolean canSubmitForMarket(Market market) {
        return this.getProvince().equalsIgnoreCase(market.getProvince());
    }
}