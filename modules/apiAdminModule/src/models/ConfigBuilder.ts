import {relationsConfig} from "./Relations";
import iPageResponse = ak.jsonDaoModule.iPageResponse;
import iSource = ak.jsonDaoModule.iSource;
import FieldType = ak.crudTableModule.fieldTypes.FieldType;
import {getDbId} from "./getDbId";


export class ConfigBuilder {

    daoFactory:ak.jsonDaoModule.iDAOFactoryService
    fieldsSource: iSource<ak.apiAdminModule.iField>;
    relsSource: iSource<ak.apiAdminModule.iRelation>;
    $q: ng.IQService;

    constructor(inj: ng.auto.IInjectorService) {
        this.daoFactory = inj.get<ak.jsonDaoModule.iDAOFactoryService>(ak.jsonDaoModule.Deps.daoFactoryService);
        this.fieldsSource = this.daoFactory.build("field", ak.utils.ApiUrls.admin);
        this.relsSource = this.daoFactory.build("rel", ak.utils.ApiUrls.admin);
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
            getDbId(this.$q, this.daoFactory).then((dbId:number)=>{
                this.fieldsSource
                    .getFullPage([{field: "base.table.url", op: "eq", value: tableUrl},{field: "base.table.dbId", op: "eq", value: dbId}],[{name:"table"}])
                    .then((table: iPageResponse<ak.apiAdminModule.iField>) => {
                        let fields = ConfigBuilder.getFields(table.data);
                        config = ak.crudTableModule.CrudTableConfig(tableUrl, "/api/crud", tableUrl, "majorAdmin");
                        config.setFields(fields);
                        console.log(fields);
                        deferred.resolve(config);
                        //new relationsConfig(tableUrl, this.relsSource,this.fieldsSource,this.$q).getRelationsConfig()
                        //    .then((relFields: ak.crudTableModule.TableField<FieldType>[]) => {
                        //        config.setFields(relFields);
                        //        deferred.resolve(config);
                        //    })
                        //    .catch((err) => deferred.reject(err))

                    })
                    .catch((err) => { deferred.reject({msg: "Can't resolve table", err: err })});
            })
        }
        return deferred.promise

    }

    static getFields(fields: ak.apiAdminModule.iField[]): ak.crudTableModule.TableField<FieldType>[] {

        let result: ak.crudTableModule.TableField<any>[] = [];

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
                case 'json':
                    fieldType = ak.crudTableModule.fieldTypes.ObjField;
                    formly = 'object';
                    break;
                case 'timestamp':
                    fieldType = ak.crudTableModule.fieldTypes.StrField;
                    formly = 'input';
                    break;
                default:console.error(`Field type ${fieldType} isn't supported`,f)
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
