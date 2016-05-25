import {fieldType} from "../models/TableField";

interface IBoolField extends fieldType {}

export class BoolField implements IBoolField {

    static _type = "bool";

    type = BoolField._type;

    toSchema(): Object {
        return {
            type: this.type
        }
    }

    static map(v: Object): string[]|BoolField {
        return new BoolField()
    }

    constructor() {};

}
