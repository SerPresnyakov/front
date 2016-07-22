import {TableField} from "./models/TableField";
import {ObjField} from "./fieldTypes/ObjField";
import {TableRel} from "./models/TableRel";
import iTableField = ak.crudTableModule.TableField;

export class Schema {

    static getSchema(fields, rels?): AngularFormly.IFieldGroup[] {

        var schema:AngularFormly.IFieldGroup[] = [];

        for(let field of fields) {
            if(field.editable) {
                if (field.fieldType.type == "obj") {
                    schema.push({
                        key: field.name,
                        wrapper: "panel",
                        templateOptions: {
                            label: field.title
                        },
                        fieldGroup: this.getSchema(field.childs)
                    });
                }
                else {
                    let res = {
                        key: field.name,
                        type: field.formly,
                        templateOptions: {
                            label: field.title
                        },
                        data: {
                            test: ()=> {
                                console.log("test!")
                            }
                        }
                    };

                    switch (field.fieldType.type) {
                        case 'int':
                            res.templateOptions["type"] = "number";
                            break;
                        case 'bool':
                            res.templateOptions["type"] = "boolean";
                            break;
                    }

                    if (field.formly == "autocomplete") {
                        angular.forEach(rels, (r:TableRel) => {
                            if (r.name == field.name) {
                                res["data"]["rels"] = r.field;
                            }
                        });
                    }

                    if (field.formly == "switch") {
                        res["defaultValue"] = false;
                    }

                    if (field.formly == "select") {
                        res.templateOptions["options"] = field.options;
                        res.templateOptions["labelProp"] = "prop";
                        res.templateOptions["valueProp"] = "prop";
                    }

                    if (!field.nullable) {
                        res.templateOptions["required"] = true;
                    }

                    schema.push(res);
                }
            }
        }

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