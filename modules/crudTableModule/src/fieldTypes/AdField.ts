import iAdField = ak.crudTableModule.fieldTypes.AdField;

export class AdField implements iAdField{

    type = "ad";

    toSchema(): Object {
        return {
            type: this.type
        }
    }

    constructor(public fields) {};
}