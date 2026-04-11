package com.AgriZed.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CommodityTest {

    // Test 1 - GrainCommodity formats price correctly
    @Test
    public void testGrainCommodityFormatPrice() {
        GrainCommodity maize = new GrainCommodity("1", "Maize", "White maize", 50);
        String result = maize.formatPrice(150.00);
        assertEquals("ZMW 150.00 per 50kg bag", result);
    }

    // Test 2 - ProduceCommodity formats price correctly
    @Test
    public void testProduceCommodityFormatPrice() {
        ProduceCommodity tomatoes = new ProduceCommodity("2", "Tomatoes", "Fresh tomatoes", "crate");
        String result = tomatoes.formatPrice(80.00);
        assertEquals("ZMW 80.00 per crate", result);
    }

    // Test 3 - LivestockCommodity formats price correctly
    @Test
    public void testLivestockCommodityFormatPrice() {
        LivestockCommodity cattle = new LivestockCommodity("3", "Cattle", "Beef cattle", "cow");
        String result = cattle.formatPrice(5000.00);
        assertEquals("ZMW 5000.00 per head (cow)", result);
    }

    // Test 4 - Polymorphism test - same method different results
    @Test
    public void testPolymorphismFormatPrice() {
        Commodity grain = new GrainCommodity("1", "Maize", "White maize", 50);
        Commodity produce = new ProduceCommodity("2", "Tomatoes", "Fresh tomatoes", "crate");
        Commodity livestock = new LivestockCommodity("3", "Cattle", "Beef cattle", "cow");

        assertNotEquals(grain.formatPrice(100), produce.formatPrice(100));
        assertNotEquals(produce.formatPrice(100), livestock.formatPrice(100));
    }

    // Test 5 - Commodity name getter works
    @Test
    public void testCommodityGetName() {
        GrainCommodity maize = new GrainCommodity("1", "Maize", "White maize", 50);
        assertEquals("Maize", maize.getName());
    }

    // Test 6 - Market is created correctly
    @Test
    public void testMarketCreation() {
        Market market = new Market("1", "Soweto Market", "Lusaka", "Lusaka Province");
        assertEquals("Soweto Market", market.getName());
        assertEquals("Lusaka Province", market.getProvince());
    }

    // Test 7 - Farmer can submit for own province
    @Test
    public void testFarmerCanSubmitForOwnProvince() {
        Farmer farmer = new Farmer("1", "John", "john@email.com", "Lusaka Province", "Chongwe");
        Market market = new Market("1", "Soweto Market", "Lusaka", "Lusaka Province");
        assertTrue(farmer.canSubmitForMarket(market));
    }

    // Test 8 - Farmer cannot submit for different province
    @Test
    public void testFarmerCannotSubmitForDifferentProvince() {
        Farmer farmer = new Farmer("1", "John", "john@email.com", "Lusaka Province", "Chongwe");
        Market market = new Market("2", "Chipata Market", "Chipata", "Eastern Province");
        assertFalse(farmer.canSubmitForMarket(market));
    }

    // Test 9 - Analyst can export data
    @Test
    public void testAnalystCanExportData() {
        Analyst analyst = new Analyst("1", "Mary", "mary@email.com", "Lusaka Province", "ZUT");
        assertTrue(analyst.canExportData());
    }

    // Test 10 - Buyer cannot export data
    @Test
    public void testBuyerCannotExportData() {
        Buyer buyer = new Buyer("1", "Peter", "peter@email.com", "Lusaka Province", "AgroZed Ltd");
        assertFalse(buyer.canExportData());
    }

    // Test 11 - PriceEntry is not stale when just created
    @Test
    public void testPriceEntryIsNotStale() {
        GrainCommodity maize = new GrainCommodity("1", "Maize", "White maize", 50);
        Market market = new Market("1", "Soweto Market", "Lusaka", "Lusaka Province");
        PriceEntry entry = new PriceEntry("1", maize, market, 150.00, "50kg bag", "user1");
        assertFalse(entry.isStale());
    }

    // Test 12 - PriceEntry formatted price uses polymorphism
    @Test
    public void testPriceEntryFormattedPrice() {
        GrainCommodity maize = new GrainCommodity("1", "Maize", "White maize", 50);
        Market market = new Market("1", "Soweto Market", "Lusaka", "Lusaka Province");
        PriceEntry entry = new PriceEntry("1", maize, market, 150.00, "50kg bag", "user1");
        assertEquals("ZMW 150.00 per 50kg bag", entry.getFormattedPrice());
    }
}