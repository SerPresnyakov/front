import {TableField} from "./models/TableField";
import {ObjField} from "./fieldTypes/ObjField";
import {TableRel} from "./models/TableRel";
import iTableField = ak.crudTableModule.TableField;

export class Schema {


    static getSchema(fields, rels?): AngularFormly.IFieldGroup[] {
        let Fields = fields.filter((field:iTableField<any>)=>{
            return field.editable;
        });
        return this.getSchemaWhitEditable(Fields, rels)
    }

    static getSchemaWhitEditable(fields, rels?): AngularFormly.IFieldGroup[] {

        var schema:AngularFormly.IFieldGroup[] = [];

        fields = fields.filter((item:iTableField<any>)=>{
            if(item.fieldType.type == "default"){
                return false
            }else{
                return true
            }
        });

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
                            dao: {}
                        }
                    };

                    switch (field.fieldType.type) {
                        case 'int':
                            res.templateOptions["type"] = "number";
                            break;

                    }

                    if (field.formly == "autocomplete") {
                        angular.forEach(rels, (r:TableRel) => {
                            if (r.field == field.name) {
                                res.data["dao"] = r.dao;
                                console.log("res.data:", r.dao)
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