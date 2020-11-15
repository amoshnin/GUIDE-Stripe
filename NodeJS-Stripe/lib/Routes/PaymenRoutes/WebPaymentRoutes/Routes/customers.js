"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPaymentMethods = exports.createSetupIntent = void 0;
const index_1 = require("../../../../index");
const Helpers_1 = require("../../Shared/Helpers");
// Creates a SetupIntent used to save a credit card for later use
exports.createSetupIntent = async (userId) => {
    const customer = await Helpers_1.getOrCreateCustomer(userId);
    return index_1.stripe.setupIntents.create({
        customer: customer.id,
    });
};
// Retrieve all cards attached to a customer
exports.listPaymentMethods = async (userId) => {
    const customer = await Helpers_1.getOrCreateCustomer(userId);
    return index_1.stripe.paymentMethods.list({
        customer: customer.id,
        type: "card",
    });
};
//# sourceMappingURL=customers.js.map