import {AngularModule} from "../../utils/AngularModule";
import {Modules} from "../../utils/Deps";

const app = new AngularModule("app", [
    Modules.jsonDAO
]);