# AgriZed — Agricultural Market Price Monitor

## Project Overview
AgriZed is a Java backend system built with Javalin that monitors agricultural 
market prices across Zambia. It allows farmers, buyers, and analysts to submit 
and query commodity prices across different markets.

## Team Members
- Member 1 — [CLIFTON CHOONGO]
- Member 2 — [ABRAHAM CHAMULWANDA]
- Member 3 — [CLEOPATRA SANISELO]

## Tech Stack
- Java 25
- Javalin 6.1.3
- Gson 2.10.1
- JUnit 5.10.1
- Maven
- React + Vite
- Axios

## How to Run

### Backend
1. Open `backend/` folder in IntelliJ
2. Run `Main.java`
3. Server starts on `http://localhost:7070`

### Frontend
1. Open `frontend/` folder in VS Code
2. Run `npm install`
3. Run `npm run dev`
4. Open `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/markets` | Register a new market |
| GET | `/markets` | Get all markets |
| GET | `/markets/{id}/summary` | Get all prices at a market |
| POST | `/commodities` | Add a new commodity |
| GET | `/commodities` | Get all commodities |
| POST | `/prices` | Submit a price entry |
| GET | `/prices/current` | Latest price for every commodity |
| GET | `/prices/{commodityId}/trend` | Price history for a commodity |
| GET | `/prices/compare` | Compare commodity across markets |
| GET | `/prices/cheapest` | Cheapest market per commodity |
| POST | `/users/register` | Register a new user |
| GET | `/users` | Get all users |

## OOP Design Decisions

### Encapsulation
All fields in every class are private. Access is only through getters 
and setters that enforce validation rules.

### Inheritance
- `Commodity` (abstract) → `GrainCommodity`, `ProduceCommodity`, `LivestockCommodity`
- `User` (abstract) → `Farmer`, `Buyer`, `Analyst`

### Polymorphism
`formatPrice()` is defined in `Commodity` and overridden in each subclass.
`PriceEntry.getFormattedPrice()` calls this method — no type checks needed.

### Abstraction
Abstract classes define contracts. `Commodity` forces every subclass to 
implement `formatPrice()`. `User` forces every subclass to implement 
`getRole()`, `canSubmitPrices()`, and `canExportData()`.

## AI Usage
This project used Claude AI for guidance on:
- Project setup and structure
- Code scaffolding
- Debugging

All code was reviewed, understood, and modified by the team.

## Tests
32 JUnit tests covering all model classes, OOP pillars, and business rules.