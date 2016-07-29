
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
                    .getFullPage({fields:[{field: "base.table.url", op: "eq", value: tableUrl},{field: "base.table.dbId", op: "eq", value: getDbId(this.localStorage)}]},[{name:"table"}])
                    .then((table: iPageResponse<ak.apiAdminModule.iField>) => {
                        let fields = ConfigBuilder.getFields(table.data);
                        config = ak.crudTableModule.CrudTableConfig(tableUrl, "/api/crud", tableUrl, connName, {patch:true, create: true, delete: true});
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
            let fieldType;
            let formly;
            let editable;
            if(f.hasDefault == false){
                editable = true;
            }else{
                editable = false;
            }

            switch(f.valType.variant) {
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
                default:
                    fieldType = ak.crudTableModule.fieldTypes.DefaultField.type;
                    formly = 'default';
                    editable = false;
                    console.error("Using default fieldtype")
            }

            result.push(ak.crudTableModule.TableField(
                f.alias,
                f.alias,
                fieldType,
                f.nullable,
                editable,
                true,
                formly,
                null,
                null
            ))
        });
        return result;
    }

}
