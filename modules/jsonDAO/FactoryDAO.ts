import {Source} from "./src/Source";

export class FactoryDAO implements ng.IServiceProvider {

    $get = ["$injector", (inj: ng.auto.IInjectorService): jsonDAO.iDAOFactoryService<any> => {
        return {
            build: (tableName: string, crudUrl: string) => {
                return new Source(crudUrl, tableName, inj)
            }
        }
    }];

}