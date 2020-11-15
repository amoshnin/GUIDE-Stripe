"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStripeCheckoutSession = void 0;
const index_1 = require("../../../../index");
// Creates a Stripe Checkout session with line items
exports.createStripeCheckoutSession = async (line_items) => {
    // Example Item
    // {
    //   name: "T-Shirt",
    //   description: "Comfortable cotton T-Shirt",
    //   images: ["https://image.png"],
    //   amount: 500,
    //   currency: "usd",
    //   quantity: 1,
    // }
    const url = process.env.WEBAPP_URL;
    const session = await index_1.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        success_url: `${url}success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}failed`,
    });
    return session;
};
//# sourceMappingURL=checkout.js.map