package com.AgriZed.model;

public class ProduceCommodity extends Commodity {

    private String measurementType; // "crate" or "kg"

    public ProduceCommodity(String id, String name, String description, String measurementType) {
        super(id, name, description, measurementType);
        this.measurementType = measurementType;
    }

    public String getMeasurementType() { return measurementType; }
    public void setMeasurementType(String measurementType) { this.measurementType = measurementType; }

    @Override
    public String formatPrice(double price) {
        return String.format("ZMW %.2f per %s", price, measurementType);
    }
}