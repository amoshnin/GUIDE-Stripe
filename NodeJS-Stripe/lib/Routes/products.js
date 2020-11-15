"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsList = void 0;
const index_1 = require("../index");
// Get products list
exports.getProductsList = async (amount) => {
    const products = await index_1.stripe.products.list();
    return products;
};
//# sourceMappingURL=products.js.map