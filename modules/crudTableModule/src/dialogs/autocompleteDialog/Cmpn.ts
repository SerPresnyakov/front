import iTableField = ak.crudTableModule.TableField;
import iTableRel = ak.crudTableModule.filters.iTableRel;
import FieldType = ak.crudTableModule.fieldTypes.FieldType;
import iSource = ak.jsonDaoModule.iSource;

class Ctrl {

    static $inject = ["field", "origin", "$http", "event", "rel","mdDialog","originSource", ak.jsonDaoModule.Deps.daoFactoryService, "$q"];

    selectedItem: any;
    searchText: string;
    RelSource:iSource<any>;
    data;

    constructor(
        public field: iTableField<FieldType>,
        public origin: any,
        public $http: ng.IHttpService,
        public $event: ng.IAngularEvent,
        public rel: iTableRel,
        public mdDialog: ng.material.IDialogService,
        public originSource: iSource<any>,
        public daoFactory: ak.jsonDaoModule.iDAOFactoryService,
        public $q:ng.IQService,
        inj: ng.auto.IInjectorService
    ) {
        this.RelSource = this.daoFactory.build(rel.field, originSource.crudUrl);
    }

    querySearch(value:string) {
        if(value){
            let defer = this.$q.defer();
            this.RelSource.getFullPage([{field:"name",op:"eq",value:value}], [])
                .then((res)=>{defer.resolve(res.data)})
                .catch((err)=>{defer.reject(err)});
            return defer.promise;
        }
        //return this.source.getFullPage()

        //return this.$http.get(this.rel.dao, {
        //    params: {
        //        filter: `name_like_${text}`,
        //
        //    },
        //    headers: {token: this.source.getToken()}
        //}).then((res: any) => res.data.data);
    }

    finish($event) {
        this.origin[this.field.name] = this.selectedItem.id;
        let res = {"id":this.origin.id};
        res[this.field.name]=this.selectedItem.id;
        console.log(res);
        this.originSource.update(res);

        //this.source.patch(this.origin.id,res);
        //this.source.getOne(this.origin.id)
        //    .then((res)=>{
        //        Helper.assignegValueOfObjElement(res, this.origin);
        //    });
        this.mdDialog.hide();
    }
}

export const getDialog = (event: any, field: iTableField<FieldType>, origin: any, rel: iTableRel , mdDialog, originSource): ng.material.IDialogOptions => {
    var parentEl = angular.element(document.body);
    return {
        controllerAs: "ctrlVM",
        parent: parentEl,
        controller: Ctrl,
        targetEvent: event,
        template: require<string>('./MaterialTemplate.html'),
        clickOutsideToClose:true,
        locals: {
            field: field,
            origin: origin,
            event: event,
            rel: rel,
            mdDialog:mdDialog,
            originSource:originSource
        }
    }
};