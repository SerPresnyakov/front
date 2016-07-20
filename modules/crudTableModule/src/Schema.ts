import {TableField} from "./models/TableField";
import {ObjField} from "./fieldTypes/ObjField";
import {TableRel} from "./models/TableRel";
import iTableField = ak.crudTableModule.TableField;

export class Schema {

    static getSchema(fields, rels?): AngularFormly.IFieldGroup[] {

        var schema:AngularFormly.IFieldGroup[] = [];

        angular.forEach(fields, (f: TableField) => {
            if (f.fieldType.type == "obj") {
                schema.push({
                    key: f.name,
                    wrapper: "panel",
                    templateOptions: {
                        label: f.title
                    },
                    fieldGroup: this.getSchema(f.childs)
                });
            }
            else {
                let res = {
                    key: f.name,
                    type: f.formly,
                    templateOptions: {
                        label: f.title
                    },
                    data: {
                        test:()=>{
                            console.log("test!")
                        }
                    }
                };

                switch (f.fieldType.type){
                    case 'int': res.templateOptions["type"] ="number";
                        break;
                    case 'bool': res.templateOptions["type"] ="boolean";
                        break;
                }

                if (f.formly=="autocomplete") {
                    angular.forEach(rels,(r:TableRel) => {
                        if(r.name == f.name){
                            res["data"]["dao"]= r.dao;
                            res["data"]["rels"] = r.field;
                        }
                    });
                }

                if (f.formly == "switch") {
                    res["defaultValue"] = false;
                }

                if (f.formly=="select") {
                    res.templateOptions["options"] = f.options;
                    res.templateOptions["labelProp"] = "prop";
                    res.templateOptions["valueProp"] = "prop";
                }

                if (!f.nullable) {
                    res.templateOptions["required"] = true;
                }

                schema.push(res);

            }
        });

        //for(var i =  (schema.length -1), len =0; i > len; i--){
        //    if(schema[i].templateOptions["parent"]){
        //        this.setFieldGroup(schema, schema[i]);
        //        schema.splice(i,1);
        //    }
        //}

        return schema;
    }

    //static setFieldGroup( schema:AngularFormly.IFieldGroup[], res: AngularFormly.IFieldGroup){
    //    for(var i =  (schema.length -1), len =0; i > len; i--){
    //        if(schema[i].key == res.templateOptions["parent"]){
    //            schema[i].fieldGroup.push(res);
    //            break;
    //        }
    //    }
    //}

    //static searchParent(obj, parent:string):AngularFormly.IFieldGroup{
    //    let res;
    //
    //        for(var i = 0, len = obj.fieldGroup.length; i < len; i++){
    //            if(obj.fieldGroup[i].key==parent){
    //                res =  obj.fieldGroup[i];
    //            }else{
    //                if(obj.fieldGroup[i].fieldGroup) {
    //                    this.searchParent(obj.fieldGroup[i], parent);
    //                }
    //            }
    //        }
    //    return res;
    //}



}