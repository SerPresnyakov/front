export const SwitchType: AngularFormly.ITypeOptions = {
    template:'<md-switch ng-model="model[options.key]" ng-true-value="true" ng-false-value="false" md-theme="{{to.theme}}">{{to.label}} </md-switch>',
    name: 'switch',
    defaultOptions: {
        templateOptions: {
            disabled: false
        },
        ngModelAttrs: {
            disabled: {
                bound: 'ng-disabled'
            }
        }
    }
};