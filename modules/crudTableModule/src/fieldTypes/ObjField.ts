import {TableField} from "../TableField";
import {fieldType} from "../TableField";
import {Schema} from "../Schema";
import {TableRel} from "../TableRel";

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