"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sanitizeValue(value) {
    if (typeof value === "string") {
        return `"${value}"`;
    }
    if (value instanceof Date) {
        return `"${value.toISOString()}"`;
    }
    if (value !== undefined && value !== null) {
        return value.toString();
    }
    return null;
}
exports.sanitizeValue = sanitizeValue;
//# sourceMappingURL=utils.js.map