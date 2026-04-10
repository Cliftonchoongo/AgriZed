package com.AgriZed.model;

public class Analyst extends User {

    private String organisation;

    public Analyst(String id, String name, String email, String province, String organisation) {
        super(id, name, email, province);
        this.organisation = organisation;
    }

    public String getOrganisation() { return organisation; }
    public void setOrganisation(String organisation) { this.organisation = organisation; }

    @Override
    public String getRole() { return "ANALYST"; }

    @Override
    public boolean canSubmitPrices() { return false; }

    @Override
    public boolean canExportData() { return true; }
}