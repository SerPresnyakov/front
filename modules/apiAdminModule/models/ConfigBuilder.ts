import iPageResponse = api.iPageResponse;

import {Source} from "../../dao/Source";
import apiUrls from "../../utils/apiUrls";
import {CrudTableConfig} from "../../crudTableModule/src/crudTable/CrudTableConfig";

export class ConfigBuilder {

    fieldsSource: Source<apiAdmin.iField>;
    relsSource: Source<apiAdmin.iRelation>;
    $q: ng.IQService;

    constructor(inj: ng.auto.IInjectorService) {
        this.fieldsSource = new Source(apiUrls.admin, "fields", inj);
        this.relsSource = new Source(apiUrls.admin, "rels", inj);
        this.$q = inj.get<ng.IQService>("$q")
    }

    build(tableUrl: string, adminMode: boolean): ng.IPromise<CrudTableConfig> {

        let deferred = this.$q.defer<CrudTableConfig>();
        let crudUrl = adminMode ? apiUrls.admin : apiUrls.crud;
        let rels : any[] = [];
        let config;

        if (typeof tableUrl !== "string") {
            deferred.reject("tableName is required")
        } else {
            if (adminMode) {
                this.fieldsSource.getFullPage([{field:"base.table.url", op:"eq", value: tableUrl}])
                    .then((table) => {

                    })
            } else {
                this.fieldsSource.getFullPage([{field: "base.table.url", op: "eq", value: tableUrl}])
                    .then((table: iPageResponse<apiAdmin.iField>) => {
                        let fields = ConfigBuilder.getFields(table.data);

                        config = new CrudTableConfig(table.data[0].table.tableName, crudUrl, table.data[0].table.url);
                        config.setFields(fields);

                    })
                    .catch((err) => { deferred.reject({msg: "Can't resolve table", err: err })});

                this.relsSource.getFullPage([{field:"base.leftTable.url",op:"eq", value: tableUrl}])
                    .then((table:iPageResponse<apiAdmin.iRelation>)=>{
                        table.data.forEach((t)=>{
                            rels.push({tableName:t.rightTable.url, name:t.name});
                        });
                        console.log(rels);
                        this.fieldsSource.getFullPage([{field:"base.table.url", op:"in", value:rels}])
                            .then((table:iPageResponse<apiAdmin.iField>) => {
                                let fields = ConfigBuilder.getFields(table.data);
                                config.setFields(fields);
                                deferred.resolve(config)
                            });
                    });

            }
        }

        return deferred.promise

    }

    static getFields(fields: apiAdmin.iField[]): TableField[] {

        let result: TableField[] = [];

        let errors = [];

        angular.forEach(fields, (f: apiAdmin.iField, i) => {

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
                default: errors.push({
                    err: `Field type ${fieldType} isn't supported`,
                    field: f
                })
            }

            result.push(new TableField(
                f.name,
                f.name,
                fieldType,
                f.nullable,
                false,
                formly,
                null,
                null
            ))
        });

        return result;

    }
    static getFieldsConfig(fileds:apiAdmin.iField[]):TableField[]{
        let result:TableField[] = [];

        return result
    }
    //static getRelations(rels:apiAdmin.iRelation[]):TableRel[]{
    //    let result:TableRel[] = [];
    //    angular.forEach(rels,(r:apiAdmin.iRelation) => {
    //
    //    });
    //    return result
    //}

}
