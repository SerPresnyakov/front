import {TableField} from "./models/TableField";
import {TableRel} from "./models/TableRel";

export class Model {

    static getModel(fields, rels): Object {

        var model = {};

        angular.forEach(fields, (f: TableField) => {
            if(f.editable){
                if (f.fieldType.type=="obj") {
                    model[f.name] = this.getChilds(f);
                }
                else {
                    model[f.name] = "";
                }
            }
        });
        return model;
    }

    static getChilds(f: TableField) {
        let res = {};
        f.childs.forEach((f:TableField)=>{
            if(f.fieldType.type == "obj"){
                res[f.name] = this.getChilds(f);
            }
            else{
                res[f.name] = "";
            }
        });
        return res;
    }
}