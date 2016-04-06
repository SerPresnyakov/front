import {TableField} from "./TableField";
import {TableRel} from "./TableRel";

export class Model {

    static getModel(fields, rels): Object {

        var model = {};

        angular.forEach(fields, (f: TableField) => {


            if (f.fieldType.type=="obj") {
                model[f.name] = {};
            }
            else if (f.parent) {
                model[f.parent][f.name] = "";
            }
            else {
                model[f.name] = "";
            }

            //let res = {
            //    key: f.name,
            //    type: f.formly,
            //    templateOptions: {
            //        label: f.title
            //    }
            //};
            //if(f.formly=="autocomplete"){
            //    res["data"]  = {};
            //    angular.forEach(rels,(r:TableRel) => {
            //        if(r.name == f.name){
            //            res["data"]["rest"]= rest;
            //            res["data"]["dao"]= r.dao;
            //            res["data"]["rels"] = r.field;
            //        }
            //    });
            //}
            //
            //if(!f.nullable){
            //    res.templateOptions["required"] = true;
            //}
        });

        return model;
    }

}