import { IDatabaseProvider } from "../providers/IDatabaseProvider";
import { Table } from "../Table";

export class CreateQuery {
    constructor(private readonly table: Table<any>) { }

    public async execute(databaseProvider: IDatabaseProvider) {
        return databaseProvider.execute(this.toSQL());
    }

    public toSQL() {
        const columns = Object.values(this.table.columns).map(column => {
            let sql = `${column.columnName} ${column.dataType}`;

            if (column.unique) {
                sql += ` UNIQUE`;
            }

            if (column.notNull) {
                sql += ` NOT NULL`;
            }

            if (column.references) {
                const foreignTable = column.references.table.tableName;
                const foreignColumn = column.references.column;
                const onDelete = column.references.onDelete || "NO ACTION";
                const onUpdate = column.references.onUpdate || "NO ACTION";

                sql += ` REFERENCES ${foreignTable}(${foreignColumn}) ON DELETE ${onDelete} ON UPDATE ${onUpdate}`;
            }

            return sql;
        });

        let primaryConstraint = "";
        const primaryColumns = Object.values(this.table.columns).filter(column => column.primary);

        if (primaryColumns.length) {
            primaryConstraint = `,\n\tPRIMARY KEY (${primaryColumns.map(column => column.columnName).join(", ")})`;
        }

        return `CREATE TABLE ${this.table.tableName} (\n\t${columns.join(",\n\t")}${primaryConstraint}\n)`;
    }
}
