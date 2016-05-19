import {TableField} from "../../crudTableModule/src/TableField";
import {TableRel} from "../../crudTableModule/src/TableRel";

export class CrudStructConfig {

    fields: TableField[] = [];
    rels: TableRel[] = [];
    tab = {selected:null,tabs:[]};

    constructor(
        public dbName: string,
        public url: string
    ) {
    }
}