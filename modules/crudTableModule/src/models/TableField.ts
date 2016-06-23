export class TableField implements ak.crudTableModule.TableField {

    constructor(
        public name: string,
        public title: string,
        public fieldType: ak.crudTableModule.fieldTypes.FieldType,
        public nullable: boolean,
        public editable: boolean,
        public formly: string,
        public parent: string = null,
        public options: any = null
    ) {}

}