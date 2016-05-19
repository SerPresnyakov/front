import {Deps} from "./Deps";
import {AngularModule} from "../../modules/utils/AngularModule";
import {Run} from "../../demo/src/Run";

const module = new AngularModule("app", [
    Deps.uiRouter
]);

module.run(Run);