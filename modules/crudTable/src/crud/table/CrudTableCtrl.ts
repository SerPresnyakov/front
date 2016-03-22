import {CrudTableConfig} from "./CrudTableConfig";

import {DAO} from "../../../../dao/DAO";
import {Pager} from "../../../../dao/Pager";
import {Page} from "../../../../dao/Page";

import {getDialog as autocompleteDialog} from "./autocompleteDialog/Cmpn"
import {getDialog as createDialog} from "./createDialog/Cmpn"

import {StrField} from "./fieldTypes/StrField";
import {TableField} from "./TableField";

export class CrudTableCtrl {

    static $inject = ["$injector", "$mdEditDialog", "$mdDialog"];

    config: CrudTableConfig;

    source: DAO;
    pager: Pager;

    constructor(
        public inj: ng.auto.IInjectorService,
        public $editDialog: mdTable.EditDialogService,
        public $mdDialog: ng.material.IDialogService
    ) {}

    init(config: CrudTableConfig) {
        this.config = config;
        this.source = new DAO(this.config.sourceName, this.config.url, this.inj);
        this.pager = new Pager(1, 15);
        this.refreshPage()
    }

    editProp($event: ng.IAngularEvent, origin: any, fieldName: string) {

        $event.stopPropagation();

        let field: TableField  = this.config.fields[fieldName];

        let rel = this.config.getRel(fieldName);

        if (field) {

            if (rel) {
                this.$editDialog.show(autocompleteDialog($event, field, origin, rel))
            } else if (field.fieldType instanceof StrField) {

                this.$editDialog.small({
                    modelValue: origin[fieldName],
                    type: "text",
                    targetEvent: $event,
                    save: (ctrl: ng.INgModelController) => {
                        origin[fieldName] = ctrl.$modelValue
                    },
                    placeholder: field.title
                })

            } else {
                console.log('Unsupported field type')
            }

        } else {
            console.error(`Field '${fieldName}' not configured`)
        }

    }

    create($event: ng.IAngularEvent) {

        this.$mdDialog.show(createDialog($event, this.config))

    }

    refreshPage(): void {
        this.source.getPage(new Page().setPage(this.pager.page, this.pager.per))
            .then((res) => {
                this.pager.data = res.data;
                this.pager.total = res.items;
            })
    }

    refreshResource(origin: any) {
        this.source.getOne(origin.id).then((res) => angular.merge(origin, res))
    }

}