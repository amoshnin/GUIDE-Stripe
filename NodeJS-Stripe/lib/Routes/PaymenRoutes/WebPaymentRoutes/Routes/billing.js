"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listSubscriptions = exports.cancelSubscription = exports.createSubscription = void 0;
const index_1 = require("../../../../index");
const firebase_1 = require("../../../../Helpers/firebase");
const Helpers_1 = require("../../Shared/Helpers");
const firebase_admin_1 = require("firebase-admin");
// Attaches a payment method to the Stripe customer,
// subscribes to a Stripe plan, and saves the plan to Firestore
exports.createSubscription = async (userId, plan, payment_method) => {
    const customer = await Helpers_1.getOrCreateCustomer(userId);
    console.log(customer);
    // Attach the  payment method to the customer
    await index_1.stripe.paymentMethods.attach(payment_method, { customer: customer.id });
    // Set it as the default payment method
    await index_1.stripe.customers.update(customer.id, {
        invoice_settings: { default_payment_method: payment_method },
    });
    const subscription = await index_1.stripe.subscriptions.create({
        customer: customer.id,
        items: [{ plan }],
        expand: ["latest_invoice.payment_intent"],
    });
    const invoice = subscription.latest_invoice;
    const payment_intent = invoice.payment_intent;
    if (payment_intent.status === "succeeded") {
        await firebase_1.db
            .collection("users")
            .doc(userId)
            .set({
            stripeCustomerId: customer.id,
            activePlans: firebase_admin_1.firestore.FieldValue.arrayUnion(plan),
        }, { merge: true });
    }
    return subscription;
};
// Cancel an active subscription, syncs the data in Firestore
exports.cancelSubscription = async (userId, subscriptionId) => {
    const customer = await Helpers_1.getOrCreateCustomer(userId);
    if (customer.metadata.firebaseUID !== userId) {
        throw Error(`Firebase UID doesn't match Stripe Customer`);
    }
    const subscription = await index_1.stripe.subscriptions.del(subscriptionId);
    // Cancel at the end of period
    // const subscription = stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true });
    if (subscription.status === "canceled") {
        await firebase_1.db
            .collection("users")
            .doc(userId)
            .update({
            activePlans: firebase_admin_1.firestore.FieldValue.arrayRemove(subscription.id),
        });
    }
    return subscription;
};
// List all subscriptions linked to the Firebase userID in Stripe
exports.listSubscriptions = async (userId) => {
    const customer = await Helpers_1.getOrCreateCustomer(userId);
    const subscriptions = await index_1.stripe.subscriptions.list({
        customer: customer.id,
    });
    return subscriptions;
};
//# sourceMappingURL=billing.js.map