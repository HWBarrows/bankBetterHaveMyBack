"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function globalErrorHandler(error, req, res, next) {
    res.status(error.status || 500).send({
        error: error.message || 'Could not complete operation, please try again'
    });
}
exports.default = globalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map