import {Schema} from "../Schema";
import {Helper} from "../../../utils/Helper";
import iFilter = crudTable.filters.iFilter;

export class Filters{
    schema = [];
    filters = [];
    model;
    savedFilters =[];
    saveFilter={};

    constructor(public fields, public rels){
    }

    create(field) {
            let res: iFilter = {
                name: "",
                title: "",
                parent: "",
                formly: "",
                options: [],
                fieldType: {type: ""},
                value: ""
            };
            res.name = field.name;
            res.title = field.title;
            res.parent = field.parent;
            res.formly = field.formly;
            res.options = field.options;
            res.fieldType.type = field.fieldType.type;
            res.value = "";
        this.filters.push(res);
        this.schema = this.schema.concat(Schema.getSchema([res], this.rels));
    };

    removeField(index,name) {
        if(index>=0) {
            delete this.model[name];
            this.filters.splice(index, 1);
            this.schema.splice(index, 1);
        } else {
            console.error("Index isnt specify.")
        }
    };

    getRestFilters():string {
        let res= "";
        angular.forEach(this.filters,(f)=>{
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

    getParamsFilters(params){
        if(typeof params=='string'){
            this.model = JSON.parse(params);
        }else if(typeof params=='object'){
            this.model = params;
        }
        this.schema = [];
        this.filters = [];
        Object.getOwnPropertyNames(this.model).forEach(r =>{
            angular.forEach(this.fields,(f)=>{
                if(r === f.name){
                    this.create(f);
                }
            });
        });
    }

    exist():boolean{
        let res = false;
        if(this.schema.length>0 && this.filters.length>0){
            res = true;
        }
        return res;
    };

    resetFilter(){
        if(this.schema.length>0){
            this.schema = [];
        }
        if(this.filters.length>0) {
            this.filters = [];
        }
        this.model = {};
    }
}