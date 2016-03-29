declare module mdTable {

    interface EditDialogService {
        small(options: smallDialog): ng.IPromise<{getInput: () => ng.INgModelController}>
        show(options: ownDialog): ng.IPromise<any>
    }

    interface smallDialog {
        clickOutsideToClose?: boolean
        disableScroll?: boolean
        escToClose?: boolean
        focusOnOpen?: boolean
        messages?: Object
        modelValue: string
        placeholder: string
        save: Function
        targetEvent: ng.IAngularEvent
        type: string
        validators?: Object
    }

    interface ownDialog {
        bindToController?: boolean
        clickOutsideToClose?: boolean
        controller: any
        controllerAs?: string
        escToClose?: boolean
        focusOnOpen?: boolean
        locals?: any
        resolve?: any
        scope?: any
        targetEvent: ng.IAngularEvent
        template?: string
        templateUrl?: string
    }

}