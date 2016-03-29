import {TableField} from "./TableField";
import {ObjField} from "./fieldTypes/ObjField";
import {TableRel} from "./TableRel";

export class Schema {

    static getSchema(fields,rels,rest): Object {

        var schema = [];

        angular.forEach(fields, (f: TableField) => {

            let res = {
                key: f.name,
                type: f.formly,
                templateOptions: {
                    label: f.title
                }
            };
            if(f.formly=="autocomplete"){
                res["data"]  = {};
                angular.forEach(rels,(r:TableRel) => {
                    if(r.name == f.name){
                        res["data"]["rest"]= rest;
                        res["data"]["dao"]= r.dao;
                        res["data"]["rels"] = r.field;
                    }
                });
            }

            if(!f.nullable){
                res.templateOptions["required"] = true;
            }

            schema.push(res);
        });

        return schema;
    }

}