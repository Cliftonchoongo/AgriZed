package com.AgriZed.model;

public class LivestockCommodity extends Commodity {

    private String animalType;

    public LivestockCommodity(String id, String name, String description, String animalType) {
        super(id, name, description, "per head");
        this.animalType = animalType;
    }

    public String getAnimalType() { return animalType; }
    public void setAnimalType(String animalType) { this.animalType = animalType; }

    @Override
    public String formatPrice(double price) {
        return String.format("ZMW %.2f per head (%s)", price, animalType);
    }
}