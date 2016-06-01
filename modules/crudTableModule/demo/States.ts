import {table as directAdGroup} from "./tableConfigs/major/direct/adGroups"
import {table as adWordsAdGroup} from "./tableConfigs/major/adWords/adGroups"
import {table as clients} from "./tableConfigs/leviafan/client"
import {table as shops} from "./tableConfigs/leviafan/shop"
import {table as brands} from "./tableConfigs/major/brands";
import {table as regions} from "./tableConfigs/major/regions";
import {table as users} from "./tableConfigs/major/users";
import {table as directCampaign} from "./tableConfigs/major/direct/campaign";
import {table as adWordsCampaign} from "./tableConfigs/major/adWords/campaign";
import {CrudTableConfig} from "../src/crudTable/CrudTableConfig";
import {indexState} from "./index/IndexState"

function getStateConfig(url: string, stateName: string, config: CrudTableConfig): iRegisterMeta<ng.ui.IState> {
    return {
        name: stateName,
        config: {
            url: url,
            template: "<ak-crud-table config=\"config\">",
            controller: ["config", "$scope", (config, s) => {
                s['config'] = config
            }],
            resolve: {
                config: (): CrudTableConfig => config
            }
        }
    }
}

export const states: iRegisterMeta<ng.ui.IState>[] = [
    indexState,
    getStateConfig("directAdGroups", "index.directAdGroups", directAdGroup),
    getStateConfig("adwordsAdGroups", "index.adwordsAdGroups", adWordsAdGroup)
];