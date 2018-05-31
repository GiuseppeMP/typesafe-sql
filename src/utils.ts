import { IExtendedColumnOptions, IWrappedColumn } from "./Table";

export function sanitizeValue(value: any): string | null {
    if (typeof value === "string") {
        return `"${value}"`;
    }

    if (isColumn(value)) {
        return columnToString(value);
    }

    if (value !== undefined && value !== null) {
        return value.toString();
    }

    return null;
}

export function convertValue(column: IExtendedColumnOptions<any>, valueOrColumn: any) {
    if (!isColumn(valueOrColumn)  && column.converter) {
        return column.converter.toDB(valueOrColumn);
    }

    return valueOrColumn;
}

export function columnToString(column: IExtendedColumnOptions<any>) {
    const fullName = `${column.tableAlias}.${column.columnName}`;

    if (column.wrappedBy) {
        return `${column.wrappedBy[0]}${fullName}${column.wrappedBy[1]}`;
    } else {
        return fullName;
    }
}

export function isColumn(column: any): column is IExtendedColumnOptions<any> {
    return (column as IExtendedColumnOptions<any>).dataType !== undefined;
}

export function isWrappedColum(wrapper: any): wrapper is IWrappedColumn {
    return (wrapper as IWrappedColumn).column !== undefined && (wrapper as IWrappedColumn).wrappedBy !== undefined;
}

// export function wrappedColumn<T>(strings: TemplateStringsArray, column: IExtendedColumnOptions<T>): IExtendedColumnOptions<T>
// {
// 	const copy = JSON.parse(JSON.stringify(column));
// 	copy.wrappedBy = [...strings];
// 	return copy;
// }

// export function wrap<TableType>(strings: TemplateStringsArray, column: keyof TableType): WrappedColumn<TableType>
// {
// 	return { column, wrappedBy: [...strings] };
// }
