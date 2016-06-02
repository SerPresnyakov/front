export class TableRel implements crudTable.models.iTableRel {

    constructor(
        public name: string,
        public field: string,
        public dao: string,
        public type: crudTable.models.iTableRelType,
        public isInclude: boolean,
        public displayField: string = "name"
    ) {}

}