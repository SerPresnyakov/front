import iCrudTableConfig = crudTable.models.iCrudTableConfig;

export class ConfigsService implements ng.IServiceProvider {

    static angularName = "Configs";

    configs: iCrudTableConfig[] = [];

    addConfig(config: iCrudTableConfig) {
        this.configs.push(config)
    }

    $get(): crudTable.demo.iConfigsService {
        return {
            configs: this.configs
        }
    }

}