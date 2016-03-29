import {CrudTableConfig} from "../../../../modules/crudTableModule/src/CrudTableConfig";
import {StrField} from "../../../../modules/crudTableModule/src/fieldTypes/StrField";
import {IntField} from "../../../../modules/crudTableModule/src/fieldTypes/IntField";
import {TableRel} from "../../../../modules/crudTableModule/src/TableRel";

export const table: CrudTableConfig = new CrudTableConfig("Магазины", "/left/pricelab/shop")
    .setFields([{
        name: "name",
        title: 'Название',
        fieldType: new StrField(),
        nullable: false,
        formly:"input"
    },{
        name: "clientId",
        title: 'Клиент',
        fieldType: new IntField(),
        nullable: false,
        formly:"autocomplete"
    },{
        name: "offersFeed.encoding",
        title: 'Кодировка',
        fieldType: new StrField(),
        nullable: false,
        formly:"input"
    },{
        name: "offersFeed.url",
        title: 'URL на xml файл с офферами',
        fieldType: new StrField(),
        nullable: false,
        formly:"input"
    },{
        name: "reportExport.password",
        title: 'Пароль',
        fieldType: new StrField(),
        nullable: false,
        formly:"input"
    },{
        name: "reportExport.url",
        title: 'URL',
        fieldType: new StrField(),
        nullable: false,
        formly:"input"
    }
    ])
    .setRels([
       new TableRel("clientId", "client", "/left/client", "one",false)
    ]);