import {TableField} from "../models/TableField";
import {TableRel} from "../models/TableRel";
import {ObjField} from "../fieldTypes/ObjField";

import iCrudTableConfig = crudTable.models.iCrudTableConfig;

export class CrudTableConfig implements iCrudTableConfig {

    fields: TableField[] = [];
    rels: TableRel[] = [];
    tab = {selected:null,tabs:[]};
    allowedMethods = {patch:true, delete:true, create:true};

    constructor(
        public sourceName: string,
        public url: string,
        public tableName: string
    ) {
    }

    setFields(fields: TableField[]): CrudTableConfig {
        this.fields = this.fields.concat(fields);
        return this;
    }

    setRels(rels: TableRel[]): CrudTableConfig {
        this.rels = rels;
        return this
    }

    setTabs(tabs): CrudTableConfig {
        this.tab.tabs = tabs;
        return this
    }

    getRel(fieldName: string): TableRel {
        return this.rels.find((r) => r.name == fieldName)
    }

    getField(fieldName: string): TableField {
        return this.fields.find((r) => r.name == fieldName)
    }

    getSelectedTab(){
        this.tab.tabs.forEach((t,i)=>{
            if(t.selected){
                this.tab.selected=i;
            }
        });
    }

}