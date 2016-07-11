import iBoolField = ak.crudTableModule.fieldTypes.BoolField;

export class BoolField implements iBoolField {

    type = "bool";

    //static map(v: Object): string[]|BoolField {
    //    return new BoolField()
    //}

    constructor() {};

    toSchema(): Object {
        return {
            type: this.type
        }
    }

}
