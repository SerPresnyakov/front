import {StrField} from "../crud/table/fieldTypes/StrField";
import {CrudTableConfig} from "../crud/table/CrudTableConfig";

export const table: CrudTableConfig = new CrudTableConfig("Таблицы", "/pureRest/resource", "1:god")
    .setFields([{
        name: "name",
        title: 'Название',
        fieldType: new StrField(),
        nullable: false
    },{
        name: "tableName",
        title: 'Имя таблицы',
        fieldType: new StrField(),
        nullable: false
    },{
        name: "url",
        title: 'URL',
        fieldType: new StrField(),
        nullable: false
    }]);