import IStrField = ak.crudTableModule.fieldTypes.StrField;

export class StrField implements IStrField {

    static _type = "str";

    type = StrField._type;

    static map(v: Object): string[]|StrField {
        return new StrField(
            v['pattern'],
            v['minLength'],
            v['maxLength']
        )
    }

    toSchema(): Object {
        let res = {type: "string"};
        if (this.pattern != null) res['pattern'] = this.pattern;
        if (this.minLength != null) res['minLength'] = this.minLength;
        if (this.maxLength != null) res['maxLength'] = this.maxLength;
        return res
    }

    constructor(
        public pattern: string = null,
        public minLength: string = null,
        public maxLength: string = null
    ) {}
}