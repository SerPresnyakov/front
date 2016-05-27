/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var AngularModule_1 = __webpack_require__(1);
	var Deps_1 = __webpack_require__(2);
	var SidenavDirective_1 = __webpack_require__(3);
	var module = new AngularModule_1.AngularModule("sidenav", [
	    Deps_1.Deps.material,
	    Deps_1.Deps.mdTable
	]);
	module.directive("akSidenav", ["$compile", (function ($compile) { return SidenavDirective_1.SidenavDirective($compile); })]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module.getModuleName();


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
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
	}());
	exports.AngularModule = AngularModule;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var Deps = (function () {
	    function Deps() {
	    }
	    Deps.uiRouter = "ui.router";
	    Deps.fileModel = "file-model";
	    Deps.ngAnimate = "ngAnimate";
	    Deps.blockUI = "blockUI";
	    Deps.localStorage = "LocalStorageModule";
	    Deps.ngClipboard = 'ngClipboard';
	    Deps.ngSanitize = 'ngSanitize';
	    Deps.diffMatch = "diff-match-patch";
	    Deps.material = "ngMaterial";
	    Deps.mdTable = 'md.data.table';
	    Deps.angularFormly = "formly";
	    Deps.formlyMaterial = "formlyMaterial";
	    Deps.ngMessages = "ngMessages";
	    return Deps;
	}());
	exports.Deps = Deps;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var SideNavTemplateBuilder_1 = __webpack_require__(4);
	function SidenavDirective($compile) {
	    return {
	        scope: {
	            scope: {
	                tables: "="
	            },
	            restrict: "E",
	            link: function (scope, element, attrs) {
	                var tables = scope.tables;
	                var template = SideNavTemplateBuilder_1.SideNavTemplateBuilder(tables);
	            }
	        }
	    };
	}
	exports.SidenavDirective = SidenavDirective;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	function SideNavTemplateBuilder(tables) {
	    return '';
	}
	exports.SideNavTemplateBuilder = SideNavTemplateBuilder;


/***/ }
/******/ ]);