import FieldType = ak.crudTableModule.fieldTypes.FieldType;
import {TableRel} from "./TableRel";
export class CrudTableConfig implements ak.crudTableModule.CrudTableConfig {

    fields: ak.crudTableModule.TableField<FieldType>[] = [];
    rels: ak.crudTableModule.filters.iTableRel[] = [];
    addFunc: ak.crudTableModule.AddFunc[]=[];
    tab = {selected:null,tabs:[]};

    constructor(
        public sourceName: string,
        public url: string,
        public tableName: string,
        public connName: string,
        public allowedMethods: ak.crudTableModule.AllowedMethods,
        public framework: string = "material"
    ) {
    }

    setFramework(framework:string):CrudTableConfig {
        this.framework = framework;
        return this;
    }

    setFields(fields: ak.crudTableModule.TableField<FieldType>[]): CrudTableConfig {
        this.fields = this.fields.concat(fields);
        return this;
    }

    setRels(rels: ak.crudTableModule.filters.iTableRel[]): CrudTableConfig {
        this.rels = rels;
        return this
    }

    setAddFunc(addFunc: ak.crudTableModule.AddFunc[]):CrudTableConfig {
        this.addFunc = addFunc;
        return this
    }

    setTabs(tabs): CrudTableConfig {
        this.tab.tabs = tabs;
        return this
    }

    getRelsName(rels:TableRel[]):ak.jsonDaoModule.iRelation[]{
        let res:ak.jsonDaoModule.iRelation[]=[];
        rels.forEach((r:TableRel)=>{
            if(r.include){
                res.push({name:r.field, include:this.getRelsName(r.include)})
            }else{
                res.push({name:r.field})
            }
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