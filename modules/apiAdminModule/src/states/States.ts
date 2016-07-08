import {indexState} from "./IndexState"
import iPageResponse = ak.jsonDaoModule.iPageResponse;
import iCrudTableConfig = ak.crudTableModule.CrudTableConfig;
import {ConfigBuilder} from "../models/ConfigBuilder";
import iDAOFactoryService = ak.jsonDaoModule.iDAOFactoryService;

interface iStateParams{
    name: string
}

export const states: ak.config<ng.ui.IState>[] = [
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
                config: ["$stateParams", "$injector", "$q", (stateParams: iStateParams, inj: ng.auto.IInjectorService, $q: ng.IQService): ng.IPromise<iCrudTableConfig> => {
                    let deferred = $q.defer<iCrudTableConfig>();
                    console.log(stateParams.name);
                    let tableName = stateParams.name;
                    if (!tableName) {
                        deferred.reject({msg: "can't build config", err: "tableName isn't specified"})
                    } else {
                        new ConfigBuilder(inj).build(tableName, false)
                            .then((res) => {deferred.resolve(res); console.log("test",res)})
                            .catch((err) => {deferred.reject({msg: "can't build config", err: err}),console.log("test",err)});
                    }
                    return deferred.promise
                }]
            }
        }
    },
    {
        name:"dbAdmin.table",
        config: {
            url: "/table/:name",
            template:"<ak-crud-table config=\'config\'>",
            controller: ["config", "$scope",(config,s)=>{
                console.log("controller is initialized");
                s['config'] = config;
            }],
            resolve: {
                config: ["$stateParams","$injector", "$q", (stateParams:iStateParams, inj: ng.auto.IInjectorService, $q:ng.IQService):ng.IPromise<iCrudTableConfig> => {
                    let deferred = $q.defer<iCrudTableConfig>();
                    let tableName = stateParams.name;
                    if(!tableName){
                        deferred.reject({msg:"can't build config", err: "tableName isn,t scecified"})
                    } else {
                        new ConfigBuilder(inj).build(tableName, true)
                            .then((res)=>deferred.resolve(res))
                            .catch((err)=>deferred.reject({msg:"can't build config",err:err}))
                    }
                    return deferred.promise
                }]
            }
        }
    },
    {
        name:"dbAdmin",
        config:{
            url:"dbAdmin",
            template:"<ak-sidenav tables='tables' state='state'>",
            controller:["$scope", "$state", "tables", (s, $state:ng.ui.IStateService, tables) => {
                s['state'] = $state;
                s['tables'] = tables;
            }],
            resolve: {
                tables:["$q","$injector", ak.jsonDaoModule.Deps.daoFactoryService, ($q:ng.IQService, inj:ng.auto.IInjectorService, daoFactory: iDAOFactoryService):ng.IPromise<ak.apiAdminModule.iTable[]> =>{
                    let deferred = $q.defer<ak.apiAdminModule.iTable[]>();

                    daoFactory.build("tables", ak.utils.ApiUrls.admin)
                        .getFullPage([],[])
                        .then((tables:iPageResponse<ak.apiAdminModule.iTable>)=>{
                            deferred.resolve(tables.data);
                        });

                    return deferred.promise;
                }]
            }
        }
    }
];