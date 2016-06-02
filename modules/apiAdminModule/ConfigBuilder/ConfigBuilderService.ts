import {IState} from "angular-ui-router";
import {CrudTableConfig} from "../../crudTableModule/src/crudTable/CrudTableConfig";
import {ConfigBuilder} from "../models/ConfigBuilder";
import IPromise = angular.IPromise;

export class ConfigBuilderService {
    static serviceName = "configBuilderService";

    static $inject = ["$state", "$injector", "$q"];

    constructor(public $state:IState, public inj:ng.auto.IInjectorService, public $q:ng.IQService){

    }

    getConfig(tableName):IPromise<CrudTableConfig>{
        console.log(tableName);
        let deferred = this.$q.defer<CrudTableConfig>();
        if (!tableName) {
            deferred.reject({msg: "can't build config", err: "tableName isn't specified"})
        } else {
            console.log('else');
            new ConfigBuilder(this.inj).build(tableName, false)
                .then((res) => deferred.resolve(res))
                .catch((err) => deferred.reject({msg: "can't build config", err: err}));
        }
        return deferred.promise
    }
}