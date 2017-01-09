import {bannerCmpn} from "./components/bannerCmpt";

const majorExtension: ak.majorExtesnionModule = {
    name: "majorExtension"
};

window["ak"]["majorExtesnionModule"] = majorExtension;

let module = ak.utils.angularModule(ak.majorExtesnionModule.name, [
    ak.utils.Deps.material,
    ak.utils.Deps.angularFormly,
    ak.utils.Deps.formlyMaterial
]);

module.registerComponent([bannerCmpn]);
