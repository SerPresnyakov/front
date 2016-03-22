import {TableField} from "./TableField";
import {TableRel} from "./TableRel";
import {ObjField} from "./fieldTypes/ObjField";

export class CrudTableConfig {

    fields: TableField[] = [];
    rels: TableRel[] = [];

    constructor(
        public sourceName: string,
        public url: string
    ) {}

    setFields(fields: TableField[]): CrudTableConfig {
        this.fields = fields;
        return this;
    }

    setRels(rels: TableRel[]): CrudTableConfig {
        this.rels = rels;
        return this
    }

    getRel(fieldName: string): TableRel {
        return this.rels.find((r) => r.field == fieldName)
    }



}