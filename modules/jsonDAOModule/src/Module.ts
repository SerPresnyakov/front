import {Deps} from "./Deps";
import {FactoryDAO} from "./FactoryDAO";

const module = ak.utils.angularModule(ak.jsonDaoModule.name, []);

module.module.provider(ak.jsonDaoModule.Deps.daoFactoryService, FactoryDAO);

const jsonDaoModule = {
    name:"jsonDaoModule",
    Deps: Deps
};

window["ak"]["jsonDaoModule"] = jsonDaoModule;