import {SideNavTemplateBuilder} from "./SideNavTemplateBuilder";
import IScope = angular.IScope;
import {Const} from "../../const/const";

interface SidenaveScope extends IScope {
    tables: ak.apiAdminModule.iTable[]
}

export function SidenavDirective($compile: ng.ICompileService, localStorage: ng.local.storage.ILocalStorageService): ng.IDirective {
    return{
        scope: {
            tables: "=",
            state: "="
        },
        controller: Ctrl,
        controllerAs: 'vm',
        restrict: "E",
        link: (scope: SidenaveScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes ) => {
            let tables = scope.tables;
            let template = new SideNavTemplateBuilder(tables).getTemplate(JSON.parse(localStorage.get<string>("connName")).name);
            element.html(template);
            $compile(element.contents())(scope)
        }
    }
}

class Ctrl{

    static $inject = [ak.jsonDaoModule.Deps.daoFactoryService, "$q", ak.utils.Deps.localStorageService, '$state'];
    connSource;
    conn;
    conns:any[];

    constructor(
        public daoFactory: ak.jsonDaoModule.iDAOFactoryService,
        public $q:ng.IQService,
        public localStorage: ng.local.storage.ILocalStorageService,
        public state:ng.ui.IStateService
    ){
        this.connSource = this.daoFactory.build("dbConn", Const.admin);
        this.conn = JSON.parse(this.localStorage.get<string>("connName"));
    }

    loadConnName(){
        let defer = this.$q.defer();
        this.connSource.getFullPage(null)
            .then((res)=>{defer.resolve(res.data)})
            .catch((err)=>{defer.reject(err)});
        defer.promise.then((res:any[])=>{
            this.conns = res;
        });
    }

    setConnName(){
        if(this.conn.name != JSON.parse(this.localStorage.get<string>("connName")).name){
            console.log(this.conn.name != JSON.parse(this.localStorage.get<string>("connName")).name);
            this.localStorage.set("connName", JSON.stringify({name: this.conn.name, dbId: this.conn.dbId}));
            console.log("local:", JSON.parse(this.localStorage.get<string>("connName")));
            this.state.go("index", {connName:JSON.parse(this.localStorage.get<string>("connName")).name})
        }

    }

    placeholder():string{
        if(this.conn){
            console.log("placeholder:1");
            return this.conn.name;
        }else{
            console.log("placeholder:2");
            return "Выбрать ConnName"
        }
    }

}