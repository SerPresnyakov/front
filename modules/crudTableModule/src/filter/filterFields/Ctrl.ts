class Ctrl {


}

export const filterFieldsDirective= {
    name: "filterFields",
    config: {
        bindings:{
            filters: "=",
            refreshPage: "="
        },
        controller: Ctrl,
        controllerAs: "filterFieldsVM",
        template: require<string>("./filterFields.html"),
        restrict: "E"
    }
};