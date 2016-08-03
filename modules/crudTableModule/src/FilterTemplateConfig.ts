export class  FilterTemplateProvider implements ng.IServiceProvider{
    framework: string = "material";

    constructor() {}

    $get(){
        return this
    }

    setFramework(framework):void {
        this.framework = framework;
    }

    getFramework():string{
        return this.framework;
    }
};
