export class TableField implements crudTable.models.iTableField {

    constructor(
        public name: string,
        public title: string,
        public fieldType: crudTable.models.iFieldType,
        public nullable: boolean,
        public editable: boolean,
        public formly: string,
        public parent: string = null,
        public options: any = null
    ) {}

}