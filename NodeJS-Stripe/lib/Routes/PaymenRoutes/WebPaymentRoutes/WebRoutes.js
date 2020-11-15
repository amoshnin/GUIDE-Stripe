"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
// >PLUGINS IMPORTS< //
exports.app = express_1.default();
const index_1 = require("../../../index");
/////////////////////////////////////////
// >ROUTES IMPORTS< //
const checkout_1 = require("./Routes/checkout");
const payments_1 = require("./Routes/payments");
const webhooks_1 = require("./Routes/webhooks");
//
const functions_1 = require("../../../Helpers/functions");
const customers_1 = require("./Routes/customers");
const billing_1 = require("./Routes/billing");
/////////////////////////////////////////
const router = express_1.default.Router();
// Checkout //
router.post("/checkout", functions_1.runAsync(async ({ body }, res) => {
    res.send(await checkout_1.createStripeCheckoutSession(body.line_items));
}));
// Payment intents API //
// Crate a PaymentIntent
router.post("/payments", functions_1.runAsync(async ({ body }, res) => {
    res.send(await payments_1.createPaymentIntent(body.amount, body.email));
}));
// Webhooks //
// Handle webhooks
router.post("/hooks", functions_1.runAsync(webhooks_1.handleStripeWebhook));
// Customers and Setup Intents
// Save a card on the customer record with a SetupIntent
router.post("/wallet", functions_1.runAsync(async (req, res) => {
    const user = functions_1.validateUser(req);
    const setupIntent = await customers_1.createSetupIntent(user.uid);
    res.send(setupIntent);
}));
router.post("/addWallet", functions_1.runAsync(async (req, res) => {
    console.log("hello in addWallet");
    // const user = validateUser(req)
    const token = req.body.token;
    console.log(token);
    // const s = await stripe.tokens.retrieve(token)
    const charge = await index_1.stripe.charges.create({
        amount: 2000,
        currency: "eur",
        source: token,
        description: "My First Test Charge (created for API docs)",
    });
    console.log(charge);
    res.send(charge);
}));
// Retrieve all cards attached to a customer
router.get("/wallet", functions_1.runAsync(async (req, res) => {
    console.log("IN WALLET GET");
    const user = functions_1.validateUser(req);
    const wallet = await customers_1.listPaymentMethods(user.uid);
    res.send(wallet.data);
}));
// Billing and Recurring subscriptions
// Create and charge new subscription
router.post("/subscriptions", functions_1.runAsync(async (req, res) => {
    const user = functions_1.validateUser(req);
    const { plan, payment_method } = req.body;
    console.log(user);
    const subscription = await billing_1.createSubscription(user.uid, plan, payment_method);
    res.send(subscription);
}));
// List all subscription
router.get("/subscriptions", functions_1.runAsync(async (req, res) => {
    const user = functions_1.validateUser(req);
    const subscriptions = await billing_1.listSubscriptions(user.uid);
    res.send(subscriptions.data);
}));
// Unsubscribe or cancel subscription
router.patch("/subscriptions", functions_1.runAsync(async (req, res) => {
    const user = functions_1.validateUser(req);
    res.send(await billing_1.cancelSubscription(user.uid, req.params.id));
}));
exports.default = router;
//# sourceMappingURL=WebRoutes.js.map