import {AngularModule} from "../utils/AngularModule";
import {Modules} from "../utils/Deps";
import {FactoryDAO} from "./FactoryDAO";
import {Deps} from "./Deps";

const module = new AngularModule(Modules.jsonDAO, []);

module.module.provider(Deps.daoFactoryService, FactoryDAO);