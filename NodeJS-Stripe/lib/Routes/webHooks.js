"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStripeWebhook = void 0;
const index_1 = require("../index");
const firebase_1 = require("../Helpers/firebase");
const firebase_admin_1 = require("firebase-admin");
const webhookHandlers = {
    "payment_intent.succeeded": async (data) => {
        // Add your business logic here
    },
    "payment_intent.payment_failed": async (data) => {
        // Add your business logic here
    },
    "customer.subscription.deleted": async (data) => { },
    "customer.subscription.created": async (data) => {
        const customer = (await index_1.stripe.customers.retrieve(data.customer));
        const userId = customer.metadata.firebaseUID;
        const userRef = firebase_1.db.collection("users").doc(userId);
        await userRef.update({
            activePlans: firebase_admin_1.firestore.FieldValue.arrayUnion(data.id),
        });
    },
    "invoice.payment_succeeded": async (data) => {
        // Add your business logic here
    },
    "invoice.payment_failed": async (data) => {
        const customer = (await index_1.stripe.customers.retrieve(data.customer));
        const userSnapshot = await firebase_1.db
            .collection("users")
            .doc(customer.metadata.firebaseUID)
            .get();
        await userSnapshot.ref.update({ status: "PAST_DUE" });
    },
};
// Business logic for specific webhook event types
exports.handleStripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const event = index_1.stripe.webhooks.constructEvent(req["rawBody"], sig, process.env.STRIPE_WEBHOOK_SECERT_KEY);
    try {
        await webhookHandlers[event.type](event.data.object);
        res.send({ received: true });
    }
    catch (err) {
        console.error(err);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
};
//# sourceMappingURL=webHooks.js.map