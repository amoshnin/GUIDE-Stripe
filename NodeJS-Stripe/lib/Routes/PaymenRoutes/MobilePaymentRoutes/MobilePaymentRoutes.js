"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
// >PLUGINS IMPORTS< //
exports.app = express_1.default();
/////////////////////////////////////////
// >ROUTES IMPORTS< //
const functions_1 = require("../../../Helpers/functions");
// Checkout
const checkout_1 = require("./Routes/checkout");
// Payment methods
const paymentMethods_1 = require("./Routes/paymentMethods");
/////////////////////////////////////////
const router = express_1.default.Router();
router.post("/m_charge", functions_1.runAsync(async (req, res) => {
    const { userId, token, amount, currency } = req.body;
    res.send(await checkout_1.chargeCheckout(userId, token, amount, currency));
}));
router.post("/m_payment_method", functions_1.runAsync(async (req, res) => {
    const { userId, token } = req.body;
    res.send(await paymentMethods_1.addPaymentMethod(userId, token));
}));
router.patch("/m_payment_method", functions_1.runAsync(async (req, res) => {
    const { userId, cardId } = req.body;
    res.send(await paymentMethods_1.delPaymentMethod(userId, cardId));
}));
exports.default = router;
//# sourceMappingURL=MobilePaymentRoutes.js.map