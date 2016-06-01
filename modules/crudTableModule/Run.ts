import IFormlyConfig = AngularFormly.IFormlyConfig;
import {AutocompleteType} from "./src/formly/autocompleteType/AutocompleteType";
import {PanelWrapper, InputContainerWrapper,FilterWrapper} from "./src/formly/Wrappers";

export class Run {

    static $inject = ["$rootScope", "$mdSidenav", "$mdMedia","formlyConfig"];

    constructor(rootScope: ng.IRootScopeService, sidenav: ng.material.ISidenavService, mdMedia: ng.material.IMedia,formlyConfig:IFormlyConfig) {

        rootScope.$on('$stateChangeSuccess', () => {
            var nav;
            if (!mdMedia('gt-sm')) nav = sidenav("leftNav");
            if (nav && nav.isOpen()) nav.close()
        });

        formlyConfig.setType(AutocompleteType);
        formlyConfig.setWrapper(PanelWrapper);
        //formlyConfig.setWrapper(InputContainerWrapper);
        formlyConfig.setWrapper(FilterWrapper);

    }

}