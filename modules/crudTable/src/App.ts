
import {Deps} from "./Deps";
import {Config} from "./Config";
import {Run} from "./Run";
import {states} from "./States";
import CrudModule from "./crud/Module"

const module = angular.module("app", [
    Deps.uiRouter,
    CrudModule
]);

Config.registerStates(module.name, states);

module.run(Run);

module.config(Config);