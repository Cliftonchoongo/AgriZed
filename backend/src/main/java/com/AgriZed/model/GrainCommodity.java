package com.AgriZed.model;

public class GrainCommodity extends Commodity {

    private double bagWeightKg;

    public GrainCommodity(String id, String name, String description, double bagWeightKg) {
        super(id, name, description, "50kg bag");
        this.bagWeightKg = bagWeightKg;
    }

    public double getBagWeightKg() { return bagWeightKg; }
    public void setBagWeightKg(double bagWeightKg) { this.bagWeightKg = bagWeightKg; }

    @Override
    public String formatPrice(double price) {
        return String.format("ZMW %.2f per %.0fkg bag", price, bagWeightKg);
    }
}