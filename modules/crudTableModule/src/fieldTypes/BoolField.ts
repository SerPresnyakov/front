import iBoolField = crudTable.models.fields.iBoolField;

export class BoolField implements iBoolField {

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
