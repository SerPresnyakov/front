import {Deps} from "./Deps";
import {FactoryDAO} from "./FactoryDAO";
import {Pager} from "./models/Pager";
import {Page} from "./models/Page";

const jsonDaoModule = {
    name:"jsonDaoModule",
    Deps: Deps,
    iPager:(page: number, per: number, $q: ng.IQService):Pager=>{
        return new Pager(page, per, $q);
    },
    iPage:() :Page=>{
        return new Page();
    }

};

window["ak"]["jsonDaoModule"] = jsonDaoModule;

const module = ak.utils.angularModule(ak.jsonDaoModule.name, []);

module.module.provider(ak.jsonDaoModule.Deps.daoFactoryService, FactoryDAO);

