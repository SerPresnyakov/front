import {table as directAdGroup} from "./tableConfigs/major/direct/adGroups"
import {table as adWordsAdGroup} from "./tableConfigs/major/adWords/adGroups"
import {table as directCampaign} from "./tableConfigs/major/direct/campaign"
import {table as adWordsCampaign} from "./tableConfigs/major/adWords/campaign"
import {table as brands} from "./tableConfigs/major/brands"
import {table as regions} from "./tableConfigs/major/regions"
import {table as users} from "./tableConfigs/major/users"
import {ConfigsService} from "./ConfigsService";

export class Config {

    static $inject = [
        `${ConfigsService.angularName}Provider`,
        "$urlRouterProvider"
    ];

    constructor(
        configs: crudTable.demo.iConfigsServiceProvider,
        $url: ng.ui.IUrlRouterProvider
    ) {
        $url.when("", "/");
        configs.addConfig(directAdGroup);
        //configs.addConfig(adWordsAdGroup);
        configs.addConfig(directCampaign);
        //configs.addConfig(adWordsCampaign);
        configs.addConfig(brands);
        configs.addConfig(regions);
        //configs.addConfig(users);
    }

    static getStateName(tableName):string{
        let res = tableName.replace('.','_');
        console.log(res);
        return res;
    }

}