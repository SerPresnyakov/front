import IFormlyConfig = AngularFormly.IFormlyConfig;
import {PanelWrapper,InputContainerWrapper,LabelWrapper} from "../../modules/crudTableModule/src/formly/Wrappers";
import {AutocompleteType} from "../../modules/crudTableModule/src/formly/autocompleteType/AutocompleteType";

export class Run {

    static $inject = ["$rootScope", "$mdSidenav", "$mdMedia"];

    constructor(rootScope: ng.IRootScopeService, sidenav: ng.material.ISidenavService, mdMedia: ng.material.IMedia, formlyConfig:IFormlyConfig) {

        rootScope.$on('$stateChangeSuccess', () => {
            var nav;
            if (!mdMedia('gt-sm')) nav = sidenav("leftNav");
            if (nav && nav.isOpen()) nav.close()
        });

    }

}