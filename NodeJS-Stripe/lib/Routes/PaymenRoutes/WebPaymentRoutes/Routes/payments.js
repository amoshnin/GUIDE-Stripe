"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentIntent = void 0;
const index_1 = require("../../../../index");
// Create a Payment Intent with a specific amount
exports.createPaymentIntent = async (amount, email) => {
    const paymentIntent = await index_1.stripe.paymentIntents.create({
        amount,
        currency: "usd",
        receipt_email: email,
    });
    return paymentIntent;
};
//# sourceMappingURL=payments.js.map