import {Schema} from "../Schema";

export class Filters{
    schema;
    filters = [];
    model;

    constructor(public fields, public rels){
    }

    create(field) {
            let res:iFilter = {
                name: "",
                title: "",
                parent: "",
                formly: "",
                options: [],
                fieldType: {type: ""},
                value: ""
            };
            res.name = field.name;
            res.title = field.title;
            res.parent = field.parent;
            res.formly = field.formly;
            res.options = field.options;
            res.fieldType.type = field.fieldType.type;
            res.value = "";
        this.filters.push(res);
        this.schema = Schema.getSchema(this.filters, this.rels);
    }

    remove() {

    }
}