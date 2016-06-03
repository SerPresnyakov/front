
import {table as clients} from "./tableConfigs/leviafan/client"
import {table as shops} from "./tableConfigs/leviafan/shop"
import {table as brands} from "./tableConfigs/major/brands";
import {table as regions} from "./tableConfigs/major/regions";
import {table as users} from "./tableConfigs/major/users";
import {table as directCampaign} from "./tableConfigs/major/direct/campaign";
import {table as adWordsCampaign} from "./tableConfigs/major/adWords/campaign";
import {indexState} from "./index/IndexState"

import iCrudTableConfig = crudTable.models.iCrudTableConfig;
import {ConfigsService} from "./ConfigsService";

export class StatesRegister {

    static $inject = [`${ConfigsService.angularName}Provider`, "$stateProvider"];

    static getStateName(tableName: string): string {
        return tableName.replace('.','_');
    }

    constructor(configs: ConfigsService, stateProvider: ng.ui.IStateProvider) {

        stateProvider.state(indexState.name, indexState.config);

        angular.forEach(configs.configs, (config: iCrudTableConfig) => {
            let stateName = StatesRegister.getStateName(config.tableName);
            console.log(`Registering state ${stateName}`, config);
            stateProvider.state(`index.${stateName}`, {
                url: `${stateName}?filters`,
                template: "<ak-crud-table config=\"config\">",
                controller: ["config", "$scope", (config, s) => {
                    s['config'] = config;
                }],
                resolve: {
                    config: (): iCrudTableConfig => config
                }
            })
        })
    }



}