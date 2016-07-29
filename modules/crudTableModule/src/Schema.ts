import {TableField} from "./models/TableField";
import {ObjField} from "./fieldTypes/ObjField";
import {TableRel} from "./models/TableRel";
import iTableField = ak.crudTableModule.TableField;

export class Schema {


    static getSchema(fields, rels?): AngularFormly.IFieldGroup[] {
        let Fields = fields.filter((field:iTableField<any>)=>{
            if(field.editable){
                return false
            }
            else{ return true}
        });
        return this.getSchemaWhitEditable(Fields, rels)
    }

    static getSchemaWhitEditable(fields, rels?): AngularFormly.IFieldGroup[] {

        var schema:AngularFormly.IFieldGroup[] = [];

        for(let field of fields) {
                if (field.fieldType.type == "obj") {
                    schema.push({
                        key: field.name,
                        wrapper: "panel",
                        templateOptions: {
                            label: field.title
                        },
                        fieldGroup:field.childs? this.getSchema(field.childs) : []
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

        return schema;
    }



}