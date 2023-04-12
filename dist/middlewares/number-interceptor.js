"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberInterceptor = void 0;
function NumberInterceptor(minValue) {
    return async (_, next) => {
        const result = await next();
        // hide ratings below minValue
        if (typeof result === "number" && result < minValue) {
            return null;
        }
        return result;
    };
}
exports.NumberInterceptor = NumberInterceptor;
//# sourceMappingURL=number-interceptor.js.map