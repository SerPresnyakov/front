import {indexState} from "./states/IndexState"
import {ConfigBuilder} from "./models/ConfigBuilder";
import apiUrls from "../utils/apiUrls";
import {CrudTableConfig} from "../crudTableModule/src/models/CrudTableConfig";
import {Source} from "../jsonDAO/src/Source";
import {Page} from "../jsonDAO/src/Page";
import iPageResponse = jsonDAO.iPageResponse;

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
                config: ["$stateParams", "$injector", "$q", "myDao", (stateParams: iStateParams, inj: ng.auto.IInjectorService, $q: ng.IQService): ng.IPromise<CrudTableConfig> => {
                    let deferred = $q.defer<CrudTableConfig>();
                    console.log(stateParams.name);
                    let tableName = stateParams.name;
                    if (!tableName) {
                        deferred.reject({msg: "can't build config", err: "tableName isn't specified"})
                    } else {
                        console.log('else');
                        new ConfigBuilder(inj).build(tableName, false)
                            .then((res) => deferred.resolve(res))
                            .catch((err) => deferred.reject({msg: "can't build config", err: err}));
                    }
                    return deferred.promise
                }]
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
                config: ["$stateParams","$injector", "$q", (stateParams:iStateParams, inj: ng.auto.IInjectorService, $q:ng.IQService):ng.IPromise<CrudTableConfig> => {
                    let deferred = $q.defer<CrudTableConfig>();
                    let tableName = stateParams.name;
                    if(!tableName){
                        deferred.reject({msg:"can't build config", err: "tableName isn,t scecified"})
                    } else {
                        console.log('else');
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