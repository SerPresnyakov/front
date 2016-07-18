import IServiceProvider = angular.IServiceProvider;

export class  AuthModuleTemplateProvider implements ng.IServiceProvider{
    framework: string = "material";

    constructor() {}

    $get(){
        return this
    }

    setFramework(framework):void {
        this.framework = framework;
    }

    getFramework(){
        return this.framework;
    }

    getTemplate():string {
        if(this.framework == "inspinia"){
            return require<string>("./templates/InspiniaLoginTemplate.html");
        }else if(this.framework == "material"){
            return require<string>("./templates/MaterialLoginTemplate.html");
        }
    }
};
