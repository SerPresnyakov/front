import {TableField} from "../models/TableField";
import {fieldType} from "../models/TableField";
import {Schema} from "../Schema";
import {TableRel} from "../models/TableRel";

export interface IObjField extends fieldType {
}

export class ObjField implements IObjField {

    static _type = "obj";

    type = ObjField._type;

    toSchema(): Object {
        let res = {type: "number"};
        return res
    }

    //static map(v: Object): string[]|ObjField {
    //    return new ObjField(
    //        v['schema']
    //    )
    //}

    constructor(

    ) {}

}