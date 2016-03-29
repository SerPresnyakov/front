import {CrudTableConfig} from "../../crudTable/src/CrudTableConfig";
import {StrField} from "../../crudTable/src/fieldTypes/StrField";

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