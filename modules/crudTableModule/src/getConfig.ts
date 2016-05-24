import {Pager} from "../../dao/Pager";
import {StrField} from "./fieldTypes/StrField";
import {IntField} from "./fieldTypes/IntField";
import {TableField} from "./TableField";
import {ObjField} from "./fieldTypes/ObjField";
import {TableRel} from "./TableRel";
import {BoolField} from "./fieldTypes/BoolField";
import {CrudTableConfig} from "./CrudTableConfig";

export class getConfig {

    static get(data: any[], tableName,config): CrudTableConfig {
        //console.log('getConfig: ',data,tableName);
        let table;
        let fields = [];
        data.forEach((t)=>{
            if(t.tableName==tableName){
                table = t;
            }
        });
        console.log(table.fields[0]);

        function setField(obj,fields,parent?){
            let res;
            Object.getOwnPropertyNames(obj).forEach(prop => {
                var title = prop;
                var name = prop;
                var nullable = false;
                var editable =  false;
                var fieldType;
                var formly;
                switch(typeof obj[prop]) {
                    case 'number':
                         fieldType = new IntField();
                         formly = 'input';
                        break;
                    case 'string':
                         fieldType = new StrField();
                         formly = 'input';
                        break;
                    case 'boolean':
                         fieldType = new BoolField();
                         formly = 'switch';
                        break;
                    case 'object':
                         fieldType = new ObjField();
                         formly = 'object';
                        break;
                }

                fields.push(new TableField(name, title, fieldType ,nullable, editable, formly, parent));

                if(typeof obj[prop]== 'object'){
                    console.log('parent: ',obj[prop], prop);
                    setField(obj[prop],fields, prop);
                }
            });
            return this;
        }
        setField(table.fields[0],fields);
        config.setFields(fields);
        console.log(fields);

        return null
    }

}