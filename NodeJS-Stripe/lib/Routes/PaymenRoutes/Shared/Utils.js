"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateCustomer = void 0;
const firebase_1 = require("../../../Helpers/firebase");
const index_1 = require("../../../index");
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
//# sourceMappingURL=Utils.js.map