export interface Entry {
    name: string;
    value: any[];
}

export class Table {
    columnsNames: string[];
    columnsTypes: string[];
    columnsWidths: number[];
    data: Object[];

    constructor(columnsNames: string[], columnsTypes: string[], columnsWidths: number[], data: Object[]){
        this.columnsNames = columnsNames;
        this.columnsTypes = columnsTypes;
        this.columnsWidths = columnsWidths;
        this.data = data;
    }
}