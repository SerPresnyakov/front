import {TableField} from "../TableField";
import {fieldType} from "../TableField";
import {Helper} from "../Helper";

export interface IObjField extends fieldType {
    fields: TableField[]
}

export class ObjField implements IObjField {

    static _type = "obj";

    type = ObjField._type;

    toSchema(): Object {
        return Helper.getSchema(this.fields)
    }

    static map(v: Object): string[]|ObjField {
        return new ObjField(
            v['schema']
        )
    }

    constructor(
        public fields: TableField[]
    ) {}

}