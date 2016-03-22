import {CrudTableConfig} from "../CrudTableConfig";

export class Templater {

    constructor(
        public config: CrudTableConfig
    ) {}

    getTemplate(): string {

        return '' +
            '<md-dialog>' +
                '<md-dialog-content>' +
                    '<div class="md-dialog-content">' +
                        '<h1 class="md-title">Создание/Обновление</h1>' +
                        `<form name="modelForm" layout="column">${this.getForm()}</form>` +
                    '</div>' +
                '</md-dialog-content>' +
                '<md-dialog-actions>' +
                    '<md-button ng-click="vm.ok()">OK</md-button>' +
                '</md-dialog-actions>' +
            '</md-dialog>'

    };

    getForm(): string {

        let result = [];

        angular.forEach(this.config.fields, (f, fieldName) => {
            if (f.type == 'str') {
                result.push(
                    '<md-input-container>' +
                        `<label>${f.title}</label>` +
                        `<input ng-model="model.${fieldName}" />` +
                    '</md-input-container>'
                )
            }
        });

        return result.join("\n")

    }

}