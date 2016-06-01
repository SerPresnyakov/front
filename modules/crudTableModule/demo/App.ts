import {Modules} from "../../utils/Deps";

require("/bower/angular/angular.min.js");

const module = angular.module("app", [
    Modules.crudTable
]);