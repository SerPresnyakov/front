import iAdField = ak.crudTableModule.fieldTypes.AdField;

export class AdField extends iAdField{

    type = "ad";

    toSchema(): Object {
        return {
            type: this.type
        }
    }

    constructor() {};
}