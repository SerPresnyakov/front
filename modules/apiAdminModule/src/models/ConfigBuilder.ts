import {relationsConfig} from "./Relations";
import iPageResponse = ak.jsonDaoModule.iPageResponse;
import iSource = ak.jsonDaoModule.iSource;
import FieldType = ak.crudTableModule.fieldTypes.FieldType;
import {getDbId} from "./getDbId";
import {Const} from "../const/const";


export class ConfigBuilder {

    daoFactory:ak.jsonDaoModule.iDAOFactoryService;
    localStorage: ng.local.storage.ILocalStorageService;
    fieldsSource: iSource<ak.apiAdminModule.iField>;
    relsSource: iSource<ak.apiAdminModule.iRelation>;
    $q: ng.IQService;

    constructor(inj: ng.auto.IInjectorService) {
        this.daoFactory = inj.get<ak.jsonDaoModule.iDAOFactoryService>(ak.jsonDaoModule.Deps.daoFactoryService);
        this.localStorage = inj.get<ng.local.storage.ILocalStorageService>("localStorageService");
        this.fieldsSource = this.daoFactory.build("field", Const.admin);
        this.relsSource = this.daoFactory.build("rel", Const.admin);
        this.$q = inj.get<ng.IQService>("$q")
    }

    build(tableUrl: string, adminMode: boolean, connName:string): ng.IPromise<ak.crudTableModule.CrudTableConfig> {
        let deferred = this.$q.defer<ak.crudTableModule.CrudTableConfig>();
        let crudUrl = adminMode ? Const.admin : Const.crud;
        let rels : any[] = [];
        let config;

        if (typeof tableUrl !== "string") {
            deferred.reject("tableName is required")
        } else {
                this.fieldsSource
                    .getFullPage([{field: "base.table.url", op: "eq", value: tableUrl},{field: "base.table.dbId", op: "eq", value: getDbId(this.localStorage)}],[{name:"table"}])
                    .then((table: iPageResponse<ak.apiAdminModule.iField>) => {
                        let fields = ConfigBuilder.getFields(table.data);
                        config = ak.crudTableModule.CrudTableConfig(tableUrl, "/api/crud", tableUrl, connName);
                        config.setFields(fields);
                        console.log(fields);
                        deferred.resolve(config);

                    })
                    .catch((err) => { deferred.reject({msg: "Can't resolve table", err: err })});

        }
        return deferred.promise

    }

    static getFields(fields: ak.apiAdminModule.iField[]): ak.crudTableModule.TableField<FieldType>[] {

        let result: ak.crudTableModule.TableField<any>[] = [];

        let errors = [];

        angular.forEach(fields, (f: ak.apiAdminModule.iField, i) => {
            if(f.hasDefault == false){
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
                    case 'date':
                        fieldType = ak.crudTableModule.fieldTypes.StrField;
                        formly = 'input';
                        break;
                    case 'timestamp':
                        fieldType = ak.crudTableModule.fieldTypes.TimestampField.type;
                        formly = 'input';
                        break;
                    default:
                        fieldType = ak.crudTableModule.fieldTypes.DefaultField.type;
                        formly = 'default';
                        console.error("Using default fieldtype")
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
            }
        });
        return result;
    }

}
