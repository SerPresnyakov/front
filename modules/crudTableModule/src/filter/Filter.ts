import {Schema} from "../Schema";
import {TableField} from "../models/TableField";
import {TableRel} from "../models/TableRel";
import iTableField = ak.crudTableModule.TableField;
import iTableRel = ak.crudTableModule.filters.iTableRel;
import FieldType = ak.crudTableModule.fieldTypes.FieldType;

export class Filters implements ak.crudTableModule.filters.iFilterClass{

    schema: AngularFormly.IFieldGroup[] = [];
    applyedFilters: ak.crudTableModule.filters.iFilter[] = [];
    model:  ak.crudTableModule.filters.IModel;
    savedFilters:  ak.crudTableModule.filters.ISavedFilters[] = [];
    saveFilter:  ak.crudTableModule.filters.ISaveFilter = { searchText: null, selectedItem : null};
    filters:  ak.crudTableModule.filters.INewFilter[] = [];

    constructor(private fields:iTableField<FieldType>[],
                private rels:iTableRel[],
                public tableUrl:string
    ){
        this.filters = this.getNewFilters(fields,rels);
    }

    getNewFilters(fields:iTableField<FieldType>[],rels:iTableRel[]): ak.crudTableModule.filters.INewFilter[]{
        let schema = Schema.getSchemaWhitEditable(fields,rels);
        let res:  ak.crudTableModule.filters.INewFilter[] = [];
        fields.forEach((f:TableField)=>{
            let filter: ak.crudTableModule.filters.INewFilter = {
                name:f.name,
                applied:false,
                field:f,
                schema:[ak.utils.Helper.getArrElementByName(schema,f.name)]
            };
            res.push(filter);
        });
        return res;
    }


    apply(filter: ak.crudTableModule.filters.INewFilter):void {
        filter.applied = true;
        this.applyedFilters.push(filter.field);
        this.schema = this.schema.concat(filter.schema);
    }

    unapply(name:string):void {
        this.filters.forEach((f: ak.crudTableModule.filters.INewFilter)=>{
            if(f.name==name){
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
            angular.forEach(this.filters,(f: ak.crudTableModule.filters.INewFilter)=>{
                if(r === f.name){
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
        this.filters.forEach((f: ak.crudTableModule.filters.INewFilter)=>{
            f.applied = false;
        });
        this.model = {};
    }

    getFilterByName(name): ak.crudTableModule.filters.INewFilter{
        let res: ak.crudTableModule.filters.INewFilter;
        this.filters.forEach((f: ak.crudTableModule.filters.INewFilter)=>{
            if(f.name==name){
                res= f;
            }
        });
        return res;
    }
}