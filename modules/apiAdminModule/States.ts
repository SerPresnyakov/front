import {indexState} from "./states/IndexState"
import {ConfigBuilder} from "./models/ConfigBuilder";
import {CrudTableConfig} from "../crudTableModule/src/crudTable/CrudTableConfig";
import {Source} from "../dao/Source";
import apiUrls from "../utils/apiUrls";
import {Page} from "../dao/Page";
import iPageResponse = api.iPageResponse;

class ConfigBuilderResolver {

    static $inject = ["$stateParams","$injector", "$q"];

    constructor(stateParams:iStateParams, inj: ng.auto.IInjectorService, $q:ng.IQService) {
        let deferred = $q.defer<CrudTableConfig>();
        let tableName = stateParams.name;
        if(!tableName){
            deferred.reject({msg:"can't build config", err: "tableName isn,t scecified"})
        } else {
            console.log('else');
            new ConfigBuilder(inj).build(tableName, false)
                .then((res)=>deferred.resolve(res))
                .catch((err)=>deferred.reject({msg:"can't build config",err:err}))
        }
        return deferred.promise
    }

}

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
                config: ConfigBuilderResolver
                //config: ["configBuilderService","$stateParams", (configBuilder, stateParams:iStateParams) => {
                //
                //    return configBuilder.getConfig(stateParams.name);
                //    //let deferred = $q.defer<CrudTableConfig>();
                //    //console.log(stateParams.name);
                //    //let tableName = stateParams.name;
                //    //if (!tableName) {
                //    //    deferred.reject({msg: "can't build config", err: "tableName isn't specified"})
                //    //} else {
                //    //    console.log('else');
                //    //    new ConfigBuilder(inj).build(tableName, false)
                //    //        .then((res) => deferred.resolve(res))
                //    //        .catch((err) => deferred.reject({msg: "can't build config", err: err}));
                //    //}
                //    //return deferred.promise
                //}]
            }
        }
    },
    {
        name:"dbAdmin.table",
        config:{
            url: "/table/:name",
            template:"<ak-crud-table config=\'config\'>",
            controller: ["config", "$scope",(config,s)=>{
                console.log("controller is initialized");
                s['config'] = config;
            }],
            resolve:{
                config: ConfigBuilderResolver
            }
        }
    },
    {
        name:"dbAdmin",
        config:{
            url:"dbAdmin",
            template:"<ak-sidenav tables='tables' state='state'>",
            controller:["$scope", "$state", "tables", (s, $state:ng.ui.IStateService, tables)=>{
                s['state'] = $state;
                s['tables'] = tables;
            }],
            resolve:{
                tables:["$q","$injector",($q:ng.IQService, inj:ng.auto.IInjectorService):ng.IPromise<apiAdmin.iTable[]> =>{
                    let deferred = $q.defer<apiAdmin.iTable[]>();
                    new Source(apiUrls.admin,"tables",inj).getPage(new Page().setPage(1,100))
                        .then((tables:iPageResponse<apiAdmin.iTable>)=>{
                            deferred.resolve(tables.data);
                        });
                    return deferred.promise;
                }]
            }
        }
    }
];