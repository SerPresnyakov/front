import {Pager} from "../../dao/Pager";
import {CrudStructConfig} from "./CrudStructConfig";
import {StrField} from "../../crudTableModule/src/fieldTypes/StrField";
import {IntField} from "../../crudTableModule/src/fieldTypes/IntField";
import {TableField} from "../../crudTableModule/src/TableField";
import {ObjField} from "../../crudTableModule/src/fieldTypes/ObjField";
import {TableRel} from "../../crudTableModule/src/TableRel";
import {BoolField} from "../../crudTableModule/src/fieldTypes/BoolField";

export class getConfig {

    static get(data: any[], tableName,config): CrudStructConfig {
        //console.log('getConfig: ',data,tableName);
        let table;
        let fields = [];
        data.forEach((t)=>{
            if(t.tableName==tableName){
                table = t;
            }
        });
        console.log(table.fields[0]);

        function setField(obj,fields){
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
                fields.push(this);
                if(typeof obj[prop]== 'object'){
                    fields.push(setField(obj[prop],fields));
                }
            });
            return this;
        }
        fields.push(setField(table.fields[0],fields));


        console.log(fields);

        return null
    }

}