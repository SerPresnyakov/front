import FieldType = ak.crudTableModule.fieldTypes.FieldType;
export class TableField implements ak.crudTableModule.TableField<any> {

    constructor(
        public name: string,
        public title: string,
        public fieldType: ak.crudTableModule.fieldTypes.FieldType,
        public nullable: boolean,
        public editable: boolean,
        public showInTemplate: boolean,
        public showInFilter: boolean,
        public formly: string,
        public childs: ak.crudTableModule.TableField<FieldType>[] = null,
        public options: any = null
    ) {}

}