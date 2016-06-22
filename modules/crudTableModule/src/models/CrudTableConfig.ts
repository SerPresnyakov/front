

import iCrudTableConfig = crudTable.models.iCrudTableConfig;
import iTableField = crudTable.models.iTableField;
import iTableRel = crudTable.models.iTableRel;

export class CrudTableConfig implements iCrudTableConfig {

    fields: iTableField[] = [];
    rels: iTableRel[] = [];
    tab = {selected:null,tabs:[]};
    allowedMethods = {patch:true, delete:true, create:true};

    constructor(
        public sourceName: string,
        public url: string,
        public tableName: string,
        public connName: string
    ) {
    }

    setFields(fields: iTableField[]): CrudTableConfig {
        this.fields = this.fields.concat(fields);
        return this;
    }

    setRels(rels: iTableRel[]): CrudTableConfig {
        this.rels = rels;
        return this
    }

    setTabs(tabs): CrudTableConfig {
        this.tab.tabs = tabs;
        return this
    }

    getRel(fieldName: string): iTableRel {
        return this.rels.find((r) => r.name == fieldName)
    }

    getField(fieldName: string): iTableField {
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