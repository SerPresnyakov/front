import {relationsConfig} from "./Relations";
import iPageResponse = ak.jsonDaoModule.iPageResponse;
import iSource = ak.jsonDaoModule.iSource;


export class ConfigBuilder {

    fieldsSource: iSource<ak.apiAdminModule.iField>;
    relsSource: iSource<ak.apiAdminModule.iRelation>;
    $q: ng.IQService;

    constructor(inj: ng.auto.IInjectorService) {
        let sourceFactory = inj.get<ak.jsonDaoModule.iDAOFactoryService>(ak.jsonDaoModule.Deps.daoFactoryService);
        this.fieldsSource = sourceFactory.build("fields", ak.utils.ApiUrls.admin);
        this.relsSource = sourceFactory.build("rels", ak.utils.ApiUrls.admin);
        this.$q = inj.get<ng.IQService>("$q")
    }

    build(tableUrl: string, adminMode: boolean): ng.IPromise<ak.crudTableModule.CrudTableConfig> {
        let deferred = this.$q.defer<ak.crudTableModule.CrudTableConfig>();
        let crudUrl = adminMode ? ak.utils.ApiUrls.admin : ak.utils.ApiUrls.crud;
        let rels : any[] = [];
        let config;

        if (typeof tableUrl !== "string") {
            deferred.reject("tableName is required")
        } else {
                this.fieldsSource
                    .getFullPage([{field: "base.table.url", op: "eq", value: tableUrl}])
                    .then((table: iPageResponse<ak.apiAdminModule.iField>) => {
                        let fields = ConfigBuilder.getFields(table.data);

                        config = ak.crudTableModule.CrudTableConfig("res", "res", "res", "res");
                        config.setFields(fields);
                        new relationsConfig(tableUrl, this.relsSource,this.fieldsSource,this.$q).getRelationsConfig()
                            .then((relFields: ak.crudTableModule.filters.iTableField[]) => {
                                config.setFields(relFields);
                                deferred.resolve(config);
                            })
                            .catch((err) => deferred.reject(err))
                    })
                    .catch((err) => { deferred.reject({msg: "Can't resolve table", err: err })});
        }

        return deferred.promise

    }

    static getFields(fields: ak.apiAdminModule.iField[]): ak.crudTableModule.filters.iTableField[] {

        let result: ak.crudTableModule.filters.iTableField[] = [];

        let errors = [];

        angular.forEach(fields, (f: ak.apiAdminModule.iField, i) => {

            var fieldType;
            var formly;

            switch(f.fieldType.variant) {
                case 'number':
                    fieldType = ak.crudTableModule.fieldTypes.IntField;
                    formly = 'input';
                    break;
                case 'str':
                    fieldType = ak.crudTableModule.fieldTypes.StrField;
                    formly = 'input';
                    break;
                case 'bool':
                    fieldType = ak.crudTableModule.fieldTypes.BoolField;
                    formly = 'switch';
                    break;
                case 'object':
                    fieldType = ak.crudTableModule.fieldTypes.ObjField;
                    formly = 'object';
                    break;
                default: errors.push({
                    err: `Field type ${fieldType} isn't supported`,
                    field: f
                })
            }

            result.push(ak.crudTableModule.TableField(
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
