import iPageResponse = jsonDAO.iPageResponse;
import {Deps} from "../../../jsonDAO/Deps"
import iDAOFactoryService = jsonDAO.iDAOFactoryService;
import {AuthService} from "../../../authModule/AuthService";
import {ApiUrls} from "../../../utils/ApiUrls";

class Ctrl {

    static $inject = ["$mdSidenav", "tables"];

    constructor(
        private sidenav: ng.material.ISidenavService,
        public tables: apiAdmin.iTable[]
    ) {
        //blabla
    }

    toggleNav(name: string) {
        var a = this.sidenav(name);
        a.toggle().then((inst) => console.debug("nav", inst))
    }

}

export const indexState: iRegisterMeta<ng.ui.IState> = {
    name: "index",
    config: {
        url: "/",
        template: "<ak-sidenav tables='tables'></ak-sidenav>",
        controller: Ctrl,
        resolve: {
            tables: ["$q", "$injector", Deps.daoFactoryService, ($q:ng.IQService, $inj:ng.auto.IInjectorService, daoFactory: iDAOFactoryService) : ng.IPromise<apiAdmin.iTable[]> => {
                let deferred = $q.defer<apiAdmin.iTable[]>();
                daoFactory
                    .build<apiAdmin.iTable>("tables", ApiUrls.admin)
                    .getFullPage([])
                    .then((res: iPageResponse<apiAdmin.iTable>) => deferred.resolve(res.data))
                    .catch((err)=> deferred.reject({ msg:"Can't resolve tables", err: err }));
                return deferred.promise;
            }],
            user: [AuthService.serviceName, (auth: AuthService): ng.IPromise<any> => {
                return auth.me()
            }]
        }
    }

};