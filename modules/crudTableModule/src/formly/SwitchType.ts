export const SwitchType: AngularFormly.ITypeOptions = {
    template:'<md-switch ng-model="model[options.key]" md-theme="{{to.theme}}">{{to.label}} </md-switch>',
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