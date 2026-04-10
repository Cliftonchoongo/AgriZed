package com.AgriZed.model;

public class Buyer extends User {

    private String companyName;

    public Buyer(String id, String name, String email, String province, String companyName) {
        super(id, name, email, province);
        this.companyName = companyName;
    }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    @Override
    public String getRole() { return "BUYER"; }

    @Override
    public boolean canSubmitPrices() { return false; }

    @Override
    public boolean canExportData() { return false; }
}