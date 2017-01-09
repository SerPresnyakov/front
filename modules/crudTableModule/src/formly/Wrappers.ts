export const LabelWrapper = {
    name: 'mdLabel',
    types: ['autocomplete'],
    template: '<label>{{to.label}}</label><formly-transclude></formly-transclude>'
};

export const InputContainerWrapper = {
    name: 'mdInputContainer',
    types: ['autocomplete'],
    template: '<md-input-container><formly-transclude></formly-transclude></md-input-container>'
};

export const PanelWrapper = {
    name: 'panel',
    template: require<string>("./Panel.html")
};

export const FilterWrapper = {
    name: 'FilterWrapper',
    template: `<md-icon ng-click="formOptions.data.remove(index, options.key)" class='fa fa-times'></md-icon><formly-transclude></formly-transclude>`
};