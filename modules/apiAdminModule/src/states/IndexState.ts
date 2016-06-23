import iPageResponse = ak.jsonDaoModule.iPageResponse;
import iDAOFactoryService = ak.jsonDaoModule.iDAOFactoryService;

class Ctrl {

    static $inject = ["$mdSidenav", "tables"];

    constructor(
        private sidenav: ng.material.ISidenavService,
        public tables: ak.apiAdminModule.iTable[]
    ) {
        //blabla
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
        template: "<ak-sidenav tables='tables'></ak-sidenav>",
        controller: Ctrl,
        resolve: {
            tables: ["$q", "$injector", ak.jsonDaoModule.Deps.daoFactoryService, ($q:ng.IQService, $inj:ng.auto.IInjectorService, daoFactory: iDAOFactoryService) : ng.IPromise<ak.apiAdminModule.iTable[]> => {
                let deferred = $q.defer<ak.apiAdminModule.iTable[]>();
                daoFactory
                    .build<ak.apiAdminModule.iTable>("tables", ak.utils.ApiUrls.admin)
                    .getFullPage([])
                    .then((res: iPageResponse<ak.apiAdminModule.iTable>) => deferred.resolve(res.data))
                    .catch((err)=> deferred.reject({ msg:"Can't resolve tables", err: err }));
                return deferred.promise;
            }],
            user: [ak.authModule.authService.serviceName, (auth: ak.authModule.authService): ng.IPromise<any> => {
                return auth.me()
            }]
        }
    }

};