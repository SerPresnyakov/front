declare module crudTable.demo {

    interface iConfigsService {
        configs: models.iCrudTableConfig[]
    }

    interface iConfigsServiceProvider {
        addConfig(config: models.iCrudTableConfig)
    }

}