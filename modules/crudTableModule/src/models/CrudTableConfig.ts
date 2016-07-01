import FieldType = ak.crudTableModule.fieldTypes.FieldType;
export class CrudTableConfig implements ak.crudTableModule.CrudTableConfig {

    fields: ak.crudTableModule.TableField<FieldType>[] = [];
    rels: ak.crudTableModule.filters.iTableRel[] = [];
    tab = {selected:null,tabs:[]};
    allowedMethods = {patch:true, delete:true, create:true};

    constructor(
        public sourceName: string,
        public url: string,
        public tableName: string,
        public connName: string
    ) {
    }

    setFields(fields: ak.crudTableModule.TableField<FieldType>[]): CrudTableConfig {
        this.fields = this.fields.concat(fields);
        return this;
    }

    setRels(rels: ak.crudTableModule.filters.iTableRel[]): CrudTableConfig {
        this.rels = rels;
        return this
    }

    setTabs(tabs): CrudTableConfig {
        this.tab.tabs = tabs;
        return this
    }

    getRelsName():ak.jsonDaoModule.iRelation[]{
        let res:ak.jsonDaoModule.iRelation[]=[];
        this.rels.forEach((r)=>{
            res.push({name:r.field});
        });
        return res;
    }

    getRel(fieldName: string): ak.crudTableModule.filters.iTableRel {
        return this.rels.find((r) => r.name == fieldName)
    }

    getField(fieldName: string): ak.crudTableModule.TableField<FieldType> {
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