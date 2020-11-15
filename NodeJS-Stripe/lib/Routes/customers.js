"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPaymentMethods = exports.createSetupIntent = exports.getOrCreateCustomer = void 0;
const index_1 = require("../index");
const firebase_1 = require("../Helpers/firebase");
// Throws an error if the currentUser does not exist on the request
exports.getOrCreateCustomer = async (userId, params) => {
    const userSnapshot = await firebase_1.db.collection("users").doc(userId).get();
    const { stripeCustomerId, email } = userSnapshot.data();
    // If missing customerID, create it
    if (!stripeCustomerId) {
        //  CREATE new customer
        const customer = await index_1.stripe.customers.create(Object.assign({ email, metadata: {
                firebaseUID: userId,
            } }, params));
        await userSnapshot.ref.update({ stripeCustomerId: customer.id });
        return customer;
    }
    else {
        return (await index_1.stripe.customers.retrieve(stripeCustomerId));
    }
};
// Creates a SetupIntent used to save a credit card for later use
exports.createSetupIntent = async (userId) => {
    const customer = await exports.getOrCreateCustomer(userId);
    return index_1.stripe.setupIntents.create({
        customer: customer.id,
    });
};
// Retrieve all cards attached to a customer
exports.listPaymentMethods = async (userId) => {
    const customer = await exports.getOrCreateCustomer(userId);
    return index_1.stripe.paymentMethods.list({
        customer: customer.id,
        type: "card",
    });
};
//# sourceMappingURL=customers.js.map