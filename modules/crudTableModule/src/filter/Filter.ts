import {Schema} from "../Schema";
import {Helper} from "../../../utils/Helper";
import iFilter = crudTable.filters.iFilter;
import {TableField} from "../models/TableField";
import {TableRel} from "../models/TableRel";
import iTableField = crudTable.models.iTableField;
import filters = crudTable.filters;



export class Filters implements filters.iFilterClass{

    schema: AngularFormly.IFieldGroup[] = [];
    applyedFilters: iFilter[] = [];
    model: filters.IModel;
    savedFilters: filters.ISavedFilters[] = [];
    saveFilter: filters.ISaveFilter;
    filters: filters.INewFilter[] = [];

    constructor(private fields:iTableField[], private rels:TableRel[]){
        this.filters = this.getNewFilters(fields);
    }

    getNewFilters(fields:iTableField[]):filters.INewFilter[]{
        let schema = Schema.getSchema(fields);
        let res: filters.INewFilter[] = [];
        fields.forEach((f:TableField)=>{
            let filter:filters.INewFilter = {
                name:f.name,
                applied:false,
                field:f,
                schema:[Helper.getArrElementByName(schema,f.name)]
            };
            res.push(filter);
        });
        return res;
    }


    apply(filter:filters.INewFilter):void {
        filter.applied = true;
        this.applyedFilters.push(filter.field);
        this.schema = this.schema.concat(filter.schema);
    }

    unapply(name:string):void {
        this.filters.forEach((f:filters.INewFilter)=>{
            if(f.name==name && f.field.parent == null){
                f.applied = false;
            }
        });
    }

    removeField(index:number, name:string):void{
        if(index>=0) {
            console.log("index: ",index);
            console.log("name: ",name);
            this.unapply(name);
            delete this.model[name];
            this.applyedFilters.splice(index, 1);
            this.schema.splice(index, 1);
        } else {
            console.error("Index isnt specify.")
        }
    };

    getRestFilters():string{
        let res:string;
        angular.forEach(this.applyedFilters,(f)=>{
            if (this.model[f.name] != undefined) {
                if (f.fieldType.type == "str") {
                    if (f.parent == null) {
                        res = "base." + f.name + "_like_" + this.model[f.name] + ";" + res;
                    }
                } else if (f.fieldType.type == "int") {
                    res = "base." + f.name + "_eqN_" + this.model[f.name] + ";" + res;
                } else if (f.fieldType.type == "bool") {
                    res = "base." + f.name + "_eqB_" + this.model[f.name] + ";" + res;
                }
            } else {
                if (f.fieldType.type == "bool") {
                    res = "base." + f.name + "_eqB_false;" + res;
                }
            }
        });
        return res
    };

    getParamsFilters(params: any):void{
        console.log(params);
        if(typeof params=='string'){
            this.model = JSON.parse(params);
        }else if(typeof params=='object'){
            this.model = params;
        }
        this.schema = [];
        this.applyedFilters = [];
        Object.getOwnPropertyNames(this.model).forEach(r =>{
            angular.forEach(this.filters,(f:filters.INewFilter)=>{
                if(r === f.name && f.field.parent == null){
                    this.apply(f);
                }
            });
        });
    }

    exist():boolean{
        let res = false;
        if(this.schema.length>0 && this.applyedFilters.length>0){
            res = true;
        }
        return res;
    };

    resetFilter():void{
        if(this.schema.length>0){
            this.schema = [];
        }
        if(this.applyedFilters.length>0) {
            this.applyedFilters = [];
        }
        this.model = {};
    }

    getFilterByName(name):filters.INewFilter{
        let res:filters.INewFilter;
        this.filters.forEach((f:filters.INewFilter)=>{
            if(f.name==name && f.field.parent == null){
                res= f;
            }
        });
        return res;
    }
}