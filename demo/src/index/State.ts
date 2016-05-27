import {AuthService} from "../../../modules/authModule/AuthService";
import iPageResponse = api.iPageResponse;
import {Source} from "../../../modules/dao/Source";
import apiUrls from "../../../modules/utils/apiUrls";
import {Page} from "../../../modules/dao/Page";

class Ctrl {

    static $inject = ["$mdSidenav","tables"];

    constructor(
        private sidenav: ng.material.ISidenavService,
        public tables:apiAdmin.iTable[]
    ) {}

    toggleNav(name: string) {
        var a = this.sidenav(name);
        a.toggle().then((inst) => console.debug("nav", inst))
    }

}

export const indexState: iRegisterMeta<ng.ui.IState> = {
    name: "index",
    config: {
        url: "/",
        template: "<ak-sidenav tables='vm.tables'></ak-sidenav>",
        controllerAs: "vm",
        controller: Ctrl,
        resolve: {
            tables:["$q", "$injector", ($q:ng.IQService, $inj:ng.auto.IInjectorService) : ng.IPromise<apiAdmin.iTable[]> => {
                let deffered = $q.defer<apiAdmin.iTable[]>();
                new Source(apiUrls.admin,"tables",$inj).getPage(new Page().setPage(1,15))
                    .then((res:iPageResponse<apiAdmin.iTable>)=>{
                        deffered.resolve(res.data)
                    })
                    .catch((err)=>{deffered.reject({msg:"Can't resolve table",err:err})});
                return deffered.promise;
            }],
            user: [AuthService.serviceName, (auth: AuthService): ng.IPromise<any> => {
                return auth.me()
            }]
        }
    }

};