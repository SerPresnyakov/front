export const LabelWrapper = {
    name: 'mdLabel',
    types: ['input','autocomplete'],
    template: '<label>{{to.label}}</label><formly-transclude></formly-transclude>'
};

export const InputContainerWrapper = {
    name: 'mdInputContainer',
    types: ['input','autocomplete'],
    template: '<md-input-container class="md-block"><formly-transclude></formly-transclude></md-input-container>'
};