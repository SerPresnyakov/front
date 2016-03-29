import {fieldType} from "../TableField";

interface IIntField extends fieldType {
    min?: number
    max?: number
}

export class IntField implements IIntField {

    static _type = "int";

    type = IntField._type;

    toSchema(): Object {
        let res = {type: "number"};
        if (this.min) res['min'] = this.min;
        if (this.max) res['max'] = this.max;
        return res
    }

    static map(v: Object): string[]|IntField {
        return new IntField(v['min'], v['max'])
    }

    constructor(
        public min: number = null,
        public max: number = null
    ) {};

}
