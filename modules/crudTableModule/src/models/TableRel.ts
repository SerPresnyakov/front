export class TableRel implements ak.crudTableModule.filters.iTableRel {

    constructor(
        public name: string,
        public field: string,
        public dao: string,
        public type: ak.crudTableModule.filters.iTableRelType,
        public isInclude: boolean,
        public displayField: string = "name"
    ) {}

}