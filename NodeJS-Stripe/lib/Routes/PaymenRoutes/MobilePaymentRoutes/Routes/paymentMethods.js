"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delPaymentMethod = exports.addPaymentMethod = void 0;
const index_1 = require("../../../../index");
const Helpers_1 = require("../../Shared/Helpers");
exports.addPaymentMethod = async (userId, token) => {
    const customer = await Helpers_1.getOrCreateCustomer(userId);
    const card = await index_1.stripe.customers.createSource(customer.id, {
        source: token,
    });
    return card;
};
exports.delPaymentMethod = async (userId, cardId) => {
    const customer = await Helpers_1.getOrCreateCustomer(userId);
    const delCard = await index_1.stripe.customers.deleteSource(customer.id, cardId);
    console.log(delCard);
    return delCard;
};
//# sourceMappingURL=paymentMethods.js.map