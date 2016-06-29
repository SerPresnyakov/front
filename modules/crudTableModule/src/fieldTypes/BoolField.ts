import iBoolField = ak.crudTableModule.fieldTypes.BoolField;

export class BoolField implements iBoolField {

    type = "bool";

    toSchema(): Object {
        return {
            type: this.type
        }
    }

    //static map(v: Object): string[]|BoolField {
    //    return new BoolField()
    //}

    constructor() {};

}
