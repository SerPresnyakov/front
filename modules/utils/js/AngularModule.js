var AngularModule = (function () {
    function AngularModule(moduleName, deps) {
        this.moduleName = moduleName;
        this.module = angular.module(moduleName, deps);
    }
    AngularModule.prototype.getModuleName = function () { return this.module.name; };
    AngularModule.prototype.registerStates = function (states) {
        var _this = this;
        this.module.config(["$stateProvider", function (stateProvider) {
                states.forEach(function (state) {
                    console.debug("\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0435\u043C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 '" + state.name + "' \u0432 \u043C\u043E\u0434\u0443\u043B\u0435 " + _this.getModuleName());
                    stateProvider.state(state.name, state.config);
                });
            }]);
    };
    AngularModule.prototype.registerComponent = function (components) {
        var _this = this;
        components.forEach(function (component) {
            console.debug("\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0435\u043C \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 '" + component.name + "' \u0432 \u043C\u043E\u0434\u0443\u043B\u0435 " + _this.getModuleName());
            _this.module.component(component.name, component.config);
        });
    };
    AngularModule.prototype.registerDirective = function (directive) {
        console.debug("\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0435\u043C \u0434\u0438\u0440\u0435\u043A\u0442\u0438\u0432\u0443 '" + directive.name + "' \u0432 \u043C\u043E\u0434\u0443\u043B\u0435 " + this.getModuleName());
        this.module.directive(directive.name, directive.config);
    };
    AngularModule.prototype.registerFilter = function (filter) {
        console.debug("\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0435\u043C \u0444\u0438\u043B\u044C\u0442\u0440 '" + filter.name + "' \u0432 \u043C\u043E\u0434\u0443\u043B\u0435 " + this.getModuleName());
        this.module.filter(filter.name, filter.config);
    };
    AngularModule.prototype.registerServices = function (services) {
        var _this = this;
        services.forEach(function (service) {
            console.debug("\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0435\u043C \u0441\u0435\u0440\u0432\u0438\u0441 '" + service.name + "' \u0432 \u043C\u043E\u0434\u0443\u043B\u0435 " + _this.getModuleName());
            _this.module.service(service.name, service.config);
        });
    };
    AngularModule.prototype.directive = function (name, inlineAnnotatedFunction) {
        this.module.directive(name, inlineAnnotatedFunction);
    };
    AngularModule.prototype.config = function (initializationFunction) { this.module.config(initializationFunction); };
    AngularModule.prototype.run = function (initializationFunction) { this.module.run(initializationFunction); };
    return AngularModule;
})();
exports.AngularModule = AngularModule;
