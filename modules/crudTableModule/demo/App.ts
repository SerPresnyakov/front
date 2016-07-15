import {ConfigsService} from "./ConfigsService"
import {Config} from "./Config"
import {StatesRegister} from "./StatesRegister";
import {Run} from "./Run";

const module = ak.utils.angularModule("app", [
    ak.crudTableModule.name,
    ak.utils.Deps.uiRouter,
    ak.authModule.name,
    ak.jsonDaoModule.name,
    ak.utils.Deps.confirm
]);

module.module.provider(ConfigsService.angularName, ConfigsService);

module.config(Config);

module.module.config(StatesRegister);

module.run(Run);
