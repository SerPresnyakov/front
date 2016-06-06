import {ConfigBuilder} from "../models/ConfigBuilder";
import IPromise = angular.IPromise;
import iCrudTableConfig = crudTable.models.iCrudTableConfig;

export class ConfigBuilderService {

    static serviceName = "configBuilderService";

    static $inject = ["$injector", "$q"];

    constructor(
        public inj:ng.auto.IInjectorService,
        public $q:ng.IQService)
    {}

    getConfig(tableName:string): IPromise<iCrudTableConfig> {
        let deferred = this.$q.defer<iCrudTableConfig>();
        if (!tableName) {
            deferred.reject({msg: "can't build config", err: "tableName isn't specified"})
        } else {
            new ConfigBuilder(this.inj).build(tableName, false)
                .then((res) => deferred.resolve(res))
                .catch((err) => deferred.reject({msg: "can't build config", err: err}));
        }
        return deferred.promise
    }
}