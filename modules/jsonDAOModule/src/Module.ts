import {FactoryDAO} from "./FactoryDAO";
import {Deps} from "./Deps";

var Modules = require<ak.utils.iModules>("ak.utils/js/Deps");

const module = angular.module(Modules.jsonDAO, []);

module.provider(Deps.daoFactoryService, FactoryDAO);