# Tests Documentation

This document outlines the testing suite implemented for the SpendLens platform to ensure deterministic financial accuracy.

## Test Files

### 1. `src/tests/auditEngine.test.ts`
**Purpose:** 
This test suite verifies the core business logic of the financial engine. Because the platform's value proposition relies entirely on accurate pricing recommendations, these tests ensure that mathematical operations, seat calculations, and fallback scenarios do not produce false savings (`NaN` errors, incorrect tier overlap logic).

It specifically validates:
- **Overkill Plan Detection:** Ensuring teams under a specific size threshold are correctly downgraded to standard tiers.
- **Monthly & Annual Savings Calculation:** Ensuring `currentSpend - optimizedSpend = savings` mathematically holds true.
- **No Savings State:** Validating that already-optimized tools return exactly $0 in savings rather than breaking the UI.
- **High Savings Trigger:** Ensuring dynamic UI CTA components fire correctly based on a predefined $500 threshold.

**Run Command:**
```bash
npm run test
```
