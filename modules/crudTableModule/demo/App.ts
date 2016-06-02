import {Modules, Deps} from "../../utils/Deps";
import {AngularModule} from "../../utils/AngularModule";

import {ConfigsService} from "./ConfigsService"
import {Config} from "./Config"
import {StatesRegister} from "./StatesRegister";
import {Run} from "./Run";

const module = new AngularModule("app", [
    Modules.crudTable,
    Deps.uiRouter
]);

module.module.provider(ConfigsService.angularName, ConfigsService);

module.config(Config);

module.module.config(StatesRegister);

module.run(Run);
