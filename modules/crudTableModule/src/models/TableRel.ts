export class TableRel implements ak.crudTableModule.filters.iTableRel {

    constructor(
        public name: string,
        public field: string,
        public include: TableRel[],
        public type: ak.crudTableModule.filters.iTableRelType,
        public displayField: string = "name"
    ) {}

}