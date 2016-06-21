import {Deps} from "./Deps";
import {FactoryDAO} from "./FactoryDAO";

const module = ak.utils.angularModule(ak.jsonDaoModule.name, []);

module.module.provider(Deps.daoFactoryService, FactoryDAO);

window["ak"].jsonDaoModule = {
    name: "jsonDaoModule"
};