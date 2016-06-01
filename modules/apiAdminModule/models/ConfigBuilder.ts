import {Pager} from "../../../dao/Pager";
import {StrField} from "../fieldTypes/StrField";
import {IntField} from "../fieldTypes/IntField";
import {TableField} from "./TableField";
import {ObjField} from "../fieldTypes/ObjField";
import {TableRel} from "./TableRel";
import {BoolField} from "../fieldTypes/BoolField";
import {Source} from "../../../dao/Source";
import {Page} from "../../../dao/Page";
import {CrudTableConfig} from "../crudTable/CrudTableConfig";
import apiUrls from "../../../utils/apiUrls";
import iPageResponse = api.iPageResponse;
import {relationsConfig} from "./Relations";


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
                this.fieldsSource.getPage(new Page().setPage(1,100),[{field: "base.table.url", op: "eq", value: tableUrl}])
                    .then((table: iPageResponse<apiAdmin.iField>) => {
                        let fields = ConfigBuilder.getFields(table.data);

                        config = new CrudTableConfig(table.data[0].table.tableName, crudUrl, table.data[0].table.url);
                        config.setFields(fields);
                        new relationsConfig(tableUrl,this.relsSource,this.fieldsSource,this.$q).getRelationsConfig()
                            .then((relFields:TableField[]) => {
                                config.setFields(relFields);
                                deferred.resolve(config);
                            })
                            .catch((err)=>{
                                deferred.resolve(config);
                            })
                    })
                    .catch((err) => { deferred.reject({msg: "Can't resolve table", err: err })});
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

}
