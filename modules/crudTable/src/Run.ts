export class Run {

    static $inject = ["$rootScope", "$mdSidenav", "$mdMedia"];

    constructor(rootScope: ng.IRootScopeService, sidenav: ng.material.ISidenavService, mdMedia: ng.material.IMedia) {

        rootScope.$on('$stateChangeSuccess', () => {
            var nav;
            if (!mdMedia('gt-sm')) nav = sidenav("leftNav");
            if (nav && nav.isOpen()) nav.close()
        })

    }

}