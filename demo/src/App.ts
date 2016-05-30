import {Deps} from "../../modules/utils/Deps";
import {Config} from "./Config";
import {Run} from "./Run";

const module = angular.module("app", [
    Deps.apiAdminModule
]);

//module.run(Run);