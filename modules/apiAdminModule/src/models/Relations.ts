import iSource = ak.jsonDaoModule.iSource;
import {TableField} from "../../../crudTableModule/src/models/TableField";
import iPageResponse = ak.jsonDaoModule.iPageResponse;
import {ObjField} from "../../../crudTableModule/src/fieldTypes/ObjField";
import {IntField} from "../../../crudTableModule/src/fieldTypes/IntField";
import {StrField} from "../../../crudTableModule/src/fieldTypes/StrField";
import {BoolField} from "../../../crudTableModule/src/fieldTypes/BoolField";

interface iRelsTableName {
    relsName: string
    tableName: string
}

export class relationsConfig {

    constructor(
        public tableName: string,
        public relSource: iSource<ak.apiAdminModule.iRelation>,
        public fieldSource: iSource<ak.apiAdminModule.iField>,
        public $q:ng.IQService
    ) {}

    getRelationsConfig():ng.IPromise<TableField[]> {
        let deferred = this.$q.defer<TableField[]>();
        let res: TableField[] = [];
        this.relSource.getFullPage([{field: "base.leftTable.url", op: "eq", value: this.tableName}])
            .then((tables:iPageResponse<ak.apiAdminModule.iRelation>)=> {
                if(tables.data.length==0) {
                    deferred.reject({msg:"Table don't have relations"})
                }
                else {
                    var relsTable = new relsTables(tables.data);
                    this.fieldSource.getFullPage([{
                            field: "base.table.url",
                            op: "in",
                            value: relsTable.getTablesNames()
                        }])
                        .then((fields:iPageResponse<ak.apiAdminModule.iField>)=> {
                            var relsField = new relsFields(fields.data);
                            relsTable.rels.forEach((r)=> {
                                res = res.concat(this.setConfig(r.relsName, relsField.getFieldsByTableName(r.tableName)));
                            });
                            deferred.resolve(res);
                        })
                        .catch((err) => deferred.reject(res))
                }
            });
        return deferred.promise;
    }

    setConfig(parent:string, fileds:ak.apiAdminModule.iField[]):TableField[] {
        let res:TableField[]=[];
        res.push(new TableField(
            parent,
            parent,
            new ObjField(),
            false,
            false,
            "object",
            null,
            null
        ));

        angular.forEach(fileds, (f: ak.apiAdminModule.iField, i) => {
            var fieldType;
            var formly;

            switch(f.fieldType.variant) {
                case 'number':
                    fieldType = new IntField();
                    formly = 'input';
                    break;
                case 'str':
                    fieldType = new StrField();
                    formly = 'input';
                    break;
                case 'bool':
                    fieldType = new BoolField();
                    formly = 'switch';
                    break;
                case 'object':
                    fieldType = new ObjField();
                    formly = 'object';
                    break;
            }
            res.push(new TableField(
                f.name,
                f.name,
                fieldType,
                f.nullable,
                false,
                formly,
                parent,
                null
            ))
        });

        return res;
    }
}

class relsTables {

    rels:iRelsTableName[] = [];

    constructor(private tables:ak.apiAdminModule.iRelation[]) {
        tables.forEach((t)=> {
            this.rels.push({tableName: t.rightTable.url, relsName: t.name})
        })
    }

    getTablesNames():string[] {
        let res:string[] = [];
        this.rels.forEach((n)=> {
            res.push(n.tableName)
        });

        return res;
    }

}

class relsFields {
    constructor(public fields:ak.apiAdminModule.iField[]){
    }
    getFieldsByTableName(tableName):ak.apiAdminModule.iField[]{
        let res:ak.apiAdminModule.iField[]=[];
        this.fields.forEach((f)=>{
            if(f.table.url==tableName){
                res.push(f);
            }
        });

        return res;
    }
}