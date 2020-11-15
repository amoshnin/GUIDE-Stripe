"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chargeCheckout = void 0;
const index_1 = require("../../../../index");
const Helpers_1 = require("../../Shared/Helpers");
exports.chargeCheckout = async (userId, cardId, amount, currency) => {
    const customer = await Helpers_1.getOrCreateCustomer(userId);
    const updatedCustomer = await index_1.stripe.customers.update(customer.id, {
        default_source: cardId,
    });
    const charge = await index_1.stripe.charges.create({
        amount,
        currency,
        description: "My First Test Charge (created for API docs)",
        customer: updatedCustomer.id,
    });
    return charge;
};
//# sourceMappingURL=checkout.js.map