import {TableField} from "./models/TableField";
import {TableRel} from "./models/TableRel";

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

        });

        return model;
    }

}