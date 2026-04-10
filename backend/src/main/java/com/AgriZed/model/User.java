package com.AgriZed.model;

public abstract class User {

    private String id;
    private String name;
    private String email;
    private String province;

    public User(String id, String name, String email, String province) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.province = province;
    }

    // Getters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getProvince() { return province; }

    // Setters
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setProvince(String province) { this.province = province; }

    // Abstract method - each user type has different access level
    public abstract String getRole();

    // Abstract method - each user type has different permissions
    public abstract boolean canSubmitPrices();

    public abstract boolean canExportData();

    @Override
    public String toString() {
        return "User{id='" + id + "', name='" + name + "', role='" + getRole() + "'}";
    }
}