import {indexState} from "./index/State"
import {table as adGroupTable} from "./tableConfigs/adGroups"
import {table as tables} from "./tableConfigs/tables"
import {table as clients} from "./tableConfigs/leviafan/client"
import {table as shops} from "./tableConfigs/leviafan/shop"
import {CrudTableConfig} from "../../modules/crudTableModule/src/CrudTableConfig";

export const states: iRegisterMeta<ng.ui.IState>[] = [
    indexState,
    {
        name: "index.adGroups",
        config: {
            url: "adGroups",
            template: "<ak-crud-table config=\"config\" tmpl=\"'adGroups'\">",
            controller: ["config", "$scope", (config, s) => {
                s['config'] = config
            }],
            resolve: {
                config: (): CrudTableConfig => adGroupTable
            }
        }
    },
    {
        name: "index.adGroups2",
        config: {
            url: "adGroups2?filters",
            template: "<ak-crud-table config=\"config\">",
            controller: ["config", "$scope", (config, s) => {
                s['config'] = config
            }],
            resolve: {
                config: (): CrudTableConfig => adGroupTable
            }
        }
    },
    {
        name: "index.clients",
        config: {
            url: "clients?filters",
            template: "<ak-crud-table config=\"config\">",
            controller: ["config", "$scope", (config, s) => {
                s['config'] = config
            }],
            resolve: {
                config: (): CrudTableConfig => clients
            }
        }
    },{
        name: "index.shops",
        config: {
            url: "shops?filters",
            template: "<ak-crud-table config=\"config\">",
            controller: ["config", "$scope", (config, s) => {
                s['config'] = config
            }],
            resolve: {
                config: (): CrudTableConfig => shops
            }
        }
    },


];