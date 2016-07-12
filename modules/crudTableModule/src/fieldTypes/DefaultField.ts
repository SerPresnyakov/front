export class DefaultField implements ak.crudTableModule.fieldTypes.DefaultField{

    type = "default";

    toSchema(): Object {
        return {
            type: this.type
        }
    }

    constructor() {};

}