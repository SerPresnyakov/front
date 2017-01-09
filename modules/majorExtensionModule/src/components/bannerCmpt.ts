class Ctrl {

    static $inject = ["$mdDialog"];

    constructor(
        public mdDialog:ng.material.IDialogService
    ){}

    edit(){
        let dialog: ng.material.IDialogOptions = {

        };
        this.mdDialog.show(dialog)
    }
}

export const bannerCmpn: ak.config<ng.IComponentOptions> = {
    name:"bannerCmpn",
    config: {
        bindings: {
            banner:"="
        },
        template: require<string>("./bannerTemplate.html"),
        controller:Ctrl,
        controllerAs: "bannerVm"
    }
};
