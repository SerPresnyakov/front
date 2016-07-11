import iPageResponse = ak.jsonDaoModule.iPageResponse;
import iDAOFactoryService = ak.jsonDaoModule.iDAOFactoryService;
import {Const} from "../const/const";
import {getDbId} from "../models/getDbId";
import {connNameCtrl} from "../models/selectConnName/Ctrl";
import IDialogOptions = angular.material.IDialogOptions;

class Ctrl {

    static $inject = ["$mdSidenav", "tables", "$scope", "$state", "$mdDialog",ak.jsonDaoModule.Deps.daoFactoryService, "$q", ak.utils.Deps.localStorage, "$mdMedia"];

    constructor(private sidenav:ng.material.ISidenavService,
                public tables:ak.apiAdminModule.iTable[],
                scope:ng.IScope,
                public state:ng.ui.IState,
                public mdDialog:ng.material.IDialogService,
                public daoFactory: ak.jsonDaoModule.iDAOFactoryService,
                public $q:ng.IQService,
                public localStorage: ng.local.storage.ILocalStorageService,
                public $mdMedia:ng.material.IMedia) {
        scope["tables"] = tables;
        scope["state"] = state;
        console.log(tables, scope);
    }

    toggleNav(name:string) {
        console.log("test1");
        var a = this.sidenav(name);
        a.toggle().then((inst) => console.debug("nav", inst))
    }

    setConnName(ev) {
        console.log("test2");
        let useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs') && this.$mdMedia('xs') || this.$mdMedia('sm'));
        this.mdDialog.show({
            controller:connNameCtrl,
            controllerAs:"vm",
            template: require<string>("../models/selectConnName/connNameSelect.html"),
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen,
            locals: {
                mdDialog: this.mdDialog,
                daoFactory: this.daoFactory,
                $q :this.$q,
                localStorage: this.localStorage
            }
        })
    }
}

export const indexState: ak.config<ng.ui.IState> = {
    name: "index",
    config: {
        url: "/:connName",
        template: "<ak-sidenav tables='tables' state='state'></ak-sidenav>",
        controller: Ctrl,
        controllerAs: "vm",
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