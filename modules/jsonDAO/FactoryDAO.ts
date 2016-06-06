import {Source} from "./src/Source";

export class FactoryDAO implements ng.IServiceProvider {

    $get = ["$injector", (inj: ng.auto.IInjectorService): jsonDAO.iDAOFactoryService => {
        return {
            build: <T>(tableName: string, crudUrl: string) => {
                return new Source<T>(crudUrl, tableName, inj)
            }
        }
    }];

}