import {TableField} from "./TableField";
import {ObjField} from "./fieldTypes/ObjField";
import {TableRel} from "./TableRel";

export class Schema {

    static getSchema(fields,rels?,rest?): Object {

        var schema = [];

        angular.forEach(fields, (f: TableField) => {
            if (f.fieldType.type=="obj") {
                let res = {
                    key: f.name,
                    wrapper: "panel",
                    templateOptions: {
                        label: f.title
                    },
                    fieldGroup: []
                };

                schema.push(res);
            }
            else{
                let res = {
                    key: f.name,
                    type: f.formly,
                    templateOptions: {
                        label: f.title
                    }
                };

                if (f.formly=="autocomplete") {
                    res["data"]  = {};
                    angular.forEach(rels,(r:TableRel) => {
                        if(r.name == f.name){
                            res["data"]["rest"]= rest;
                            res["data"]["dao"]= r.dao;
                            res["data"]["rels"] = r.field;
                        }
                    });
                }

                if (f.formly=="select") {
                    res.templateOptions["options"] = f.options;
                    res.templateOptions["labelProp"] = "prop";
                    res.templateOptions["valueProp"] = "prop";
                }

                if (!f.nullable) {
                    res.templateOptions["required"] = true;
                }

                if (f.parent) {
                    angular.forEach(schema, (s)=>{
                        if(s.key == f.parent){
                            s.fieldGroup.push(res);
                        }
                    })
                }
                else{
                    schema.push(res);
                }
            }

        });

        return schema;
    }

}