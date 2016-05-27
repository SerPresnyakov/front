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


export class ConfigBuilder {

    tablesSource: Source<apiAdmin.iTable>;
    $q: ng.IQService;

    constructor(inj: ng.auto.IInjectorService) {
        this.tablesSource = new Source(apiUrls.admin, "fields", inj);
        this.$q = inj.get<ng.IQService>("$q")
    }

    build(tableName: string, adminMode: boolean): ng.IPromise<CrudTableConfig> {

        let deferred = this.$q.defer<CrudTableConfig>();

        if (typeof tableName !== "string") {
            deferred.reject("tableName is required")
        } else {
            this.tablesSource.getPage(new Page().setPage(1,100),[{field: "base.table.url", op: "eq", value: tableName}])
                .then((table: iPageResponse<apiAdmin.iField>) => {

                    let crudUrl = adminMode ? apiUrls.admin : apiUrls.crud;

                    let fields = ConfigBuilder.getFields(table.data);
                    //
                    //let res = new CrudTableConfig(table.data.tableName, crudUrl, table.data.tableName);
                    //    res.setFields(fields[0]);
                    //    deferred.resolve(res)


                })
                .catch((err) => { deferred.reject({msg: "Can't resolve table", err: err })});
        }

        return deferred.promise

    }

    static getFields(fields: apiAdmin.iField[]): [TableField[], Object[]] {

        let result: TableField[] = [];

        let errors = [];

        angular.forEach(fields, (f: apiAdmin.iField, i) => {

            var fieldType;
            var formly;

            switch(f.fieldType) {
                case 'number':
                    fieldType = new IntField();
                    formly = 'input';
                    break;
                case 'string':
                    fieldType = new StrField();
                    formly = 'input';
                    break;
                case 'boolean':
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
                "parent",
                "options"
            ))

        });

        return [result, errors];

    }

}