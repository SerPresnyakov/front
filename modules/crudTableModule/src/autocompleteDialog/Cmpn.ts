import {TableField} from "../TableField";
import {TableRel} from "../TableRel";
import {Helper} from "../../../common/Helper";

class Ctrl {

    static $inject = ["field", "origin", "$http", "event", "rel","mdDialog","source"];

    selectedItem: any;
    searchText: string;

    constructor(
        public field: TableField,
        public origin: any,
        public $http: ng.IHttpService,
        public $event: ng.IAngularEvent,
        public rel: TableRel,
        public mdDialog:any,
        public source:any,
        inj: ng.auto.IInjectorService
    ) {
    }

    querySearch(text: string): ng.IPromise<any[]> {

        return this.$http.get(this.rel.dao, {
            params: {
                filter: `name_like_${text}`,
                token: `1:god`
            }
        }).then((res: any) => res.data.data);
    }

    finish($event){
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

export const getDialog = (event: any, field: TableField, origin: any, rel: TableRel , mdDialog, source): ng.material.IDialogOptions => {
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