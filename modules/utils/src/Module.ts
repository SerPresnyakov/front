import {AngularModule} from "./AngularModule";
import Deps from "./Deps";

const utils: ak.Utils = {
    angularModule : (name: string, deps: string[]): AngularModule => {
        return new AngularModule(name, deps)
    },
    Deps: Deps
};

window["ak"]["utils"] = utils;