
import {relationsConfig} from "./Relations";
import apiUrls from "../../utils/apiUrls";

import iPageResponse = jsonDAO.iPageResponse;
import iSource = jsonDAO.iSource;

import {Deps} from "../../../jsonDAO/Deps"
import {CrudTableConfig} from "../../../crudTableModule/src/models/CrudTableConfig";
import {TableField} from "../../../crudTableModule/src/models/TableField";
import {ObjField} from "../../../crudTableModule/src/fieldTypes/ObjField";
import {BoolField} from "../../../crudTableModule/src/fieldTypes/BoolField";
import {StrField} from "../../../crudTableModule/src/fieldTypes/StrField";
import {IntField} from "../../../crudTableModule/src/fieldTypes/IntField";

export class ConfigBuilder {

    fieldsSource: iSource<apiAdmin.iField>;
    relsSource: iSource<apiAdmin.iRelation>;
    $q: ng.IQService;

    constructor(inj: ng.auto.IInjectorService) {
        let sourceFactory = inj.get<jsonDAO.iDAOFactoryService>(Deps.daoFactoryService);
        this.fieldsSource = sourceFactory.build("fields", apiUrls.admin);
        this.relsSource = sourceFactory.build("rels", apiUrls.admin);
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
                this.fieldsSource
                    .getFullPage([{field: "base.table.url", op: "eq", value: tableUrl}])
                    .then((table: iPageResponse<apiAdmin.iField>) => {
                        let fields = ConfigBuilder.getFields(table.data);

                        config = new CrudTableConfig(table.data[0].table.tableName, crudUrl, table.data[0].table.url);
                        config.setFields(fields);
                        new relationsConfig(tableUrl, this.relsSource,this.fieldsSource,this.$q).getRelationsConfig()
                            .then((relFields: TableField[]) => {
                                config.setFields(relFields);
                                deferred.resolve(config);
                            })
                            .catch((err) => deferred.reject(err))
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
