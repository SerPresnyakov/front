import {Deps} from "../../modules/utils/Deps";
import {Config} from "./Config";
import {Run} from "./Run";
import {states} from "./States";

const module = angular.module("app", [
    Deps.uiRouter,
    Deps.material,
    "crudTable",
    "sidenav",
    "a.auth"
]);

Config.registerStates(module.name, states);

module.run(Run);

module.config(Config);