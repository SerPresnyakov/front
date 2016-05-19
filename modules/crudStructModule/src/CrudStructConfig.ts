import {TableField} from "../../crudTableModule/src/TableField";
import {TableRel} from "../../crudTableModule/src/TableRel";

export class CrudStructConfig {

    fields: TableField[] = [];
    rels: TableRel[] = [];
    tab = {selected:null,tabs:[]};
    allowedMethods = { patch:true, create:true, delete:true};

    constructor(
        public dbName: string,
        public url: string
    ) {
    }

    setFields(fields: TableField[]): CrudStructConfig {
        this.fields = fields;
        return this;
    }

    setRels(rels: TableRel[]): CrudStructConfig {
        this.rels = rels;
        return this
    }

    setTabs(tabs): CrudStructConfig {
        this.tab.tabs = tabs;
        return this
    }

    getRel(fieldName: string): TableRel {
        return this.rels.find((r) => r.name == fieldName)
    }

    getField(fieldName: string): TableField {
        return this.fields.find((r) => r.name == fieldName)
    }

    getIncludes(){
        let res=[];
        this.rels.forEach((r)=> {
            if(r.isInclude)res.push(r.field);
        });
        return res;
    }

    getSelectedTab(){
        this.tab.tabs.forEach((t,i)=>{
            if(t.selected){
                this.tab.selected=i;
            }
        });
    }
}