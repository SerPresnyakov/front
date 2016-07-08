import iPageResponse = ak.jsonDaoModule.iPageResponse;
import iDAOFactoryService = ak.jsonDaoModule.iDAOFactoryService;
import {Const} from "../const/const";
import {getDbId} from "../models/getDbId";

class Ctrl {

    static $inject = ["$mdSidenav", "tables","$scope", "$state"];

    constructor(
        private sidenav: ng.material.ISidenavService,
        public tables: ak.apiAdminModule.iTable[],
        scope: ng.IScope,
        public state: ng.ui.IState
    ) {
        scope["tables"]=tables;
        scope["state"]=state;
        console.log(tables,scope);
    }

    toggleNav(name: string) {
        var a = this.sidenav(name);
        a.toggle().then((inst) => console.debug("nav", inst))
    }

}

export const indexState: ak.config<ng.ui.IState> = {
    name: "index",
    config: {
        url: "/",
        template: "<ak-sidenav tables='tables' state='state'></ak-sidenav>",
        controller: Ctrl,
        resolve: {
            tables: ["$q", "$injector", ak.jsonDaoModule.Deps.daoFactoryService, ($q:ng.IQService, $inj:ng.auto.IInjectorService, daoFactory: iDAOFactoryService) : ng.IPromise<ak.apiAdminModule.iTable[]> => {
                let deferred = $q.defer<ak.apiAdminModule.iTable[]>();
                getDbId($q,daoFactory)
                    .then((dbId:number)=>{
                        daoFactory
                            .build<ak.apiAdminModule.iTable>("table", ak.utils.ApiUrls.admin)
                            .getFullPage([{field:"base.dbId",op:"eq", value:dbId}],[])
                            .then((res: iPageResponse<ak.apiAdminModule.iTable>) => {
                                deferred.resolve(res.data)})
                            .catch((err)=> deferred.reject({ msg:"Can't resolve tables", err: err }));
                    });
                return deferred.promise;
            }],
            user: [ak.authModule.authServiceName, (auth): ng.IPromise<any> => {
                return auth.me()
            }]
        }
    }

};