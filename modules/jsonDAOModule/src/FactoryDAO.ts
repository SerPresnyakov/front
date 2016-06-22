import {Source} from "./models/Source";
import iDAOFactoryService = ak.jsonDaoModule.iDAOFactoryService;

export class FactoryDAO implements ng.IServiceProvider {

    $get = ["$injector", (inj: ng.auto.IInjectorService): iDAOFactoryService => {
        return {
            build: <T>(tableName: string, crudUrl: string) => {
                return new Source<T>(crudUrl, tableName, inj)
            }
        }
    }];

}