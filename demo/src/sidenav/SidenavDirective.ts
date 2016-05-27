import {SideNavTemplater} from "./SideNavTemplater";

interface SidenavScope extends ng.IScope {
    type: string
    config: SideNavConfig
}

class Ctrl {

    constructor() {

    }

}

interface DirectiveScope extends ng.IScope {
    config: SideNavConfig
}

export function SidenavDirective($compile: ng.ICompileService): ng.IDirective {
    return {
        scope: {
            config:"=",
        },
        link: (scope: SidenavScope, elem: ng.IAugmentedJQuery, attrs: any) => {
            let templ = new SideNavTemplater().getTemplate();
            elem.html(templ);
            $compile(elem.contents())(scope);
        }
    }
}