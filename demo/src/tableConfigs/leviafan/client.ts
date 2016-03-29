import {CrudTableConfig} from "../../../../modules/crudTableModule/src/CrudTableConfig";
import {StrField} from "../../../../modules/crudTableModule/src/fieldTypes/StrField";

export const table: CrudTableConfig = new CrudTableConfig("Клиенты", "/left/client")
    .setFields([{
        name: "name",
        title: 'Имя',
        fieldType: new StrField(),
        nullable: false,
        formly:"input"
    },{
        name: "login",
        title: 'Логин',
        fieldType: new StrField(),
        nullable: false,
        formly:"input"
    }]);