"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// >PLUGINS IMPORTS< //
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const functions_1 = require("./Helpers/functions");
exports.app = express_1.default();
/////////////////////////////////////////
exports.app.use(cors_1.default({ origin: true }));
exports.app.use(express_1.default.json({
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
}));
// Decodes the Firebase JSON Web Token
exports.app.use(functions_1.decodeJWT);
//////////////////////////////////////////////////////////////////////////////////
const WebPaymentRoutes_1 = __importDefault(require("./Routes/PaymenRoutes/WebPaymentRoutes/WebPaymentRoutes"));
const MobilePaymentRoutes_1 = __importDefault(require("./Routes/PaymenRoutes/MobilePaymentRoutes/MobilePaymentRoutes"));
// >SERVER ENDPOINTS< //
exports.app.use(WebPaymentRoutes_1.default);
exports.app.use(MobilePaymentRoutes_1.default);
//# sourceMappingURL=api.js.map