"use strict";
var UiHelper = (function () {
    function UiHelper() {
    }
    UiHelper.prototype.registerStates = function (module, states) {
        module.config(["$stateProvider", function (stateProvider) {
                states.forEach(function (state) {
                    console.info("\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0435\u043C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 '" + state.name + "' \u0432 \u043C\u043E\u0434\u0443\u043B\u0435 " + module.name);
                    stateProvider.state(state.name, state.config);
                });
            }]);
    };
    return UiHelper;
}());
exports.__esModule = true;
exports["default"] = new UiHelper();
