"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class DeleteQuery {
    constructor(table) {
        this.table = table;
        this.filters = [];
    }
    where(column, value, operator = "=") {
        this.filters.push({ column, value, operator });
        return this;
    }
    async execute(databaseProvider) {
        const { changes } = await databaseProvider.execute(this.toSQL());
        return changes;
    }
    toSQL() {
        let sql = `DELETE FROM ${this.table.tableName}`;
        if (this.filters.length) {
            const filters = this.filters.map(filter => `${filter.column} ${filter.operator} ${utils_1.sanitizeValue(filter.value)}`).join(" AND ");
            sql = `${sql} WHERE ${filters}`;
        }
        return sql;
    }
}
exports.DeleteQuery = DeleteQuery;
