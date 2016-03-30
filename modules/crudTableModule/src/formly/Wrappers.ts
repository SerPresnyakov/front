export const LabelWrapper = {
    name: 'mdLabel',
    types: ['autocomplete'],
    template: '<label>{{to.label}}</label><formly-transclude></formly-transclude>'
};

export const InputContainerWrapper = {
    name: 'mdInputContainer',
    types: ['autocomplete'],
    template: '<md-input-container class="md-block"><formly-transclude></formly-transclude></md-input-container>'
};

export const PanelWrapper = {
    name: 'panel',
    template: require<string>("./Panel.html")
};