import {AngularModule} from "./AngularModule";
import Deps from "./Deps";
import {ApiUrls} from "./apiUrls";
import {Helper} from "./Helper";

const utils:ak.Utils = {
    angularModule : (name: string, deps: string[]): AngularModule => {
        return new AngularModule(name, deps)
    },
    Deps: Deps,
    ApiUrls: ApiUrls,
    Helper: new Helper(),
};
window["ak"] ={};
window["ak"]["utils"] = utils;