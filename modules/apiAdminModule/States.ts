import {indexState} from "./../../demo/src/index/State"
import {ConfigBuilder} from "../crudTableModule/src/models/ConfigBuilder";
import {CrudTableConfig} from "../crudTableModule/src/crudTable/CrudTableConfig";

export const states: iRegisterMeta<ng.ui.IState>[] = [
    indexState,
    {
        name: "index.table",
        config: {
            url: "table/:name",
            template: "<ak-crud-table config=\"config\">",
            controller: ["config",  "$scope", (config, s) => {
                console.log("controller is initialized");
                s['config'] = config;
            }],
            resolve: {
                config: ["$stateParams", "$injector", "$q", (stateParams: any, inj: ng.auto.IInjectorService, $q: ng.IQService): ng.IPromise<CrudTableConfig> => {
                    let deferred = $q.defer<CrudTableConfig>();
                    console.log(stateParams['name']);
                    let tableName = stateParams['name'];
                    if (!tableName) {
                        deferred.reject({msg: "can't build config", err: "tableName isn't specified"})
                    } else {
                        console.log('else');
                        new ConfigBuilder(inj).build(tableName, true)
                            .then((res) => deferred.resolve(res))
                            .catch((err) => deferred.reject({msg: "can't build config", err: err}));
                    }
                    return deferred.promise
                }]
            }
        }
    }
];