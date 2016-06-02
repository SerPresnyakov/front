import {Source} from "./src/Source";

export class FactoryDAO implements ng.IServiceProvider {

    static $inject = ["$injector"];

    constructor(public inj: ng.auto.IInjectorService) {}

    $get(): jsonDAO.iDAOFactoryService<any> {
        return {
            build: (tableName: string, crudUrl: string) => {
                return new Source(crudUrl, tableName, this.inj)
            }
        }
    }


}