export class Helper {
    static createFilter(field, filters) {
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
        filters.push(res);
    }
}