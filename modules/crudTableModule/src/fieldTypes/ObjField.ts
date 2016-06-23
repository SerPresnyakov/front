import iObjField = ak.crudTableModule.fieldTypes.ObjField;

export class ObjField implements iObjField {

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