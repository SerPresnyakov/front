import {Helper} from "../../../../utils/Helper";
import iTableField = crudTable.models.iTableField;
import iTableRel = crudTable.models.iTableRel;

class Ctrl {

    static $inject = ["field", "origin", "$http", "event", "rel","mdDialog","source"];

    selectedItem: any;
    searchText: string;

    constructor(
        public field: iTableField,
        public origin: any,
        public $http: ng.IHttpService,
        public $event: ng.IAngularEvent,
        public rel: iTableRel,
        public mdDialog:any,
        public source:any,
        inj: ng.auto.IInjectorService
    ) {
    }

    querySearch(text: string): ng.IPromise<any[]> {

        return this.$http.get(this.rel.dao, {
            params: {
                filter: `name_like_${text}`,

            },
            headers: {token: this.source.getToken()}
        }).then((res: any) => res.data.data);
    }

    finish($event) {
        this.origin[this.field.name] = this.selectedItem.id;
        let res = {};
        res[this.field.name]=this.selectedItem.id;
        this.source.patch(this.origin.id,res);
        this.source.getOne(this.origin.id)
            .then((res)=>{
                Helper.assignegValueOfObjElement(res, this.origin);
            });
        this.mdDialog.hide();
    }
}

export const getDialog = (event: any, field: iTableField, origin: any, rel: iTableRel , mdDialog, source): ng.material.IDialogOptions => {
    var parentEl = angular.element(document.body);
    return {
        controllerAs: "ctrlVM",
        parent: parentEl,
        controller: Ctrl,
        targetEvent: event,
        template: require<string>("./Template.html"),
        clickOutsideToClose:true,
        locals: {
            field: field,
            origin: origin,
            event: event,
            rel: rel,
            mdDialog:mdDialog,
            source:source
        }
    }
};