package com.AgriZed.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ApiTest {

    // Test 13 - GrainCommodity unit is 50kg bag
    @Test
    public void testGrainCommodityUnit() {
        GrainCommodity grain = new GrainCommodity("1", "Maize", "White maize", 50);
        assertEquals("50kg bag", grain.getUnit());
    }

    // Test 14 - LivestockCommodity unit is per head
    @Test
    public void testLivestockCommodityUnit() {
        LivestockCommodity livestock = new LivestockCommodity("1", "Cattle", "Beef", "cow");
        assertEquals("per head", livestock.getUnit());
    }

    // Test 15 - Market province is correct
    @Test
    public void testMarketProvince() {
        Market market = new Market("1", "Soweto Market", "Lusaka", "Lusaka Province");
        assertEquals("Lusaka Province", market.getProvince());
    }

    // Test 16 - Farmer role is FARMER
    @Test
    public void testFarmerRole() {
        Farmer farmer = new Farmer("1", "John", "john@email.com", "Lusaka Province", "Chongwe");
        assertEquals("FARMER", farmer.getRole());
    }

    // Test 17 - Buyer role is BUYER
    @Test
    public void testBuyerRole() {
        Buyer buyer = new Buyer("1", "Peter", "peter@email.com", "Lusaka Province", "AgroZed");
        assertEquals("BUYER", buyer.getRole());
    }

    // Test 18 - Analyst role is ANALYST
    @Test
    public void testAnalystRole() {
        Analyst analyst = new Analyst("1", "Mary", "mary@email.com", "Lusaka Province", "ZUT");
        assertEquals("ANALYST", analyst.getRole());
    }

    // Test 19 - Farmer cannot submit prices
    @Test
    public void testFarmerCanSubmitPrices() {
        Farmer farmer = new Farmer("1", "John", "john@email.com", "Lusaka Province", "Chongwe");
        assertTrue(farmer.canSubmitPrices());
    }

    // Test 20 - Buyer cannot submit prices
    @Test
    public void testBuyerCannotSubmitPrices() {
        Buyer buyer = new Buyer("1", "Peter", "peter@email.com", "Lusaka Province", "AgroZed");
        assertFalse(buyer.canSubmitPrices());
    }

    // Test 21 - Analyst cannot submit prices
    @Test
    public void testAnalystCannotSubmitPrices() {
        Analyst analyst = new Analyst("1", "Mary", "mary@email.com", "Lusaka Province", "ZUT");
        assertFalse(analyst.canSubmitPrices());
    }

    // Test 22 - PriceEntry getFormattedPrice uses polymorphism
    @Test
    public void testPriceEntryPolymorphism() {
        GrainCommodity grain = new GrainCommodity("1", "Maize", "White maize", 50);
        Market market = new Market("1", "Soweto", "Lusaka", "Lusaka Province");
        PriceEntry entry = new PriceEntry("1", grain, market, 200.00, "50kg bag", "user1");
        assertTrue(entry.getFormattedPrice().contains("ZMW"));
    }

    // Test 23 - ProduceCommodity measurement type
    @Test
    public void testProduceCommodityMeasurementType() {
        ProduceCommodity produce = new ProduceCommodity("1", "Tomatoes", "Fresh", "crate");
        assertEquals("crate", produce.getMeasurementType());
    }

    // Test 24 - LivestockCommodity animal type
    @Test
    public void testLivestockAnimalType() {
        LivestockCommodity livestock = new LivestockCommodity("1", "Cattle", "Beef", "cow");
        assertEquals("cow", livestock.getAnimalType());
    }

    // Test 25 - GrainCommodity bag weight
    @Test
    public void testGrainCommodityBagWeight() {
        GrainCommodity grain = new GrainCommodity("1", "Maize", "White maize", 50);
        assertEquals(50, grain.getBagWeightKg());
    }

    // Test 26 - Market name getter
    @Test
    public void testMarketName() {
        Market market = new Market("1", "Soweto Market", "Lusaka", "Lusaka Province");
        assertEquals("Soweto Market", market.getName());
    }

    // Test 27 - Farmer farm location
    @Test
    public void testFarmerFarmLocation() {
        Farmer farmer = new Farmer("1", "John", "john@email.com", "Lusaka Province", "Chongwe");
        assertEquals("Chongwe", farmer.getFarmLocation());
    }

    // Test 28 - Buyer company name
    @Test
    public void testBuyerCompanyName() {
        Buyer buyer = new Buyer("1", "Peter", "peter@email.com", "Lusaka Province", "AgroZed");
        assertEquals("AgroZed", buyer.getCompanyName());
    }

    // Test 29 - Analyst organisation
    @Test
    public void testAnalystOrganisation() {
        Analyst analyst = new Analyst("1", "Mary", "mary@email.com", "Lusaka Province", "ZUT");
        assertEquals("ZUT", analyst.getOrganisation());
    }

    // Test 30 - PriceEntry is not stale when just created
    @Test
    public void testPriceEntryNotStale() {
        GrainCommodity grain = new GrainCommodity("1", "Maize", "White maize", 50);
        Market market = new Market("1", "Soweto", "Lusaka", "Lusaka Province");
        PriceEntry entry = new PriceEntry("1", grain, market, 200.00, "50kg bag", "user1");
        assertFalse(entry.isStale());
    }

    // Test 31 - Commodity toString
    @Test
    public void testCommodityToString() {
        GrainCommodity grain = new GrainCommodity("1", "Maize", "White maize", 50);
        assertTrue(grain.toString().contains("Maize"));
    }

    // Test 32 - Market toString
    @Test
    public void testMarketToString() {
        Market market = new Market("1", "Soweto Market", "Lusaka", "Lusaka Province");
        assertTrue(market.toString().contains("Soweto Market"));
    }
}