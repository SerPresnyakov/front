export class Run {
    static $inject = ["$rootScope"];

    constructor(rootscope:ng.IRootScopeService){

        rootscope.$on('$stateChangeSuccess',(e)=>{
            e.preventDefault();
            console.log('change!')
        });
        rootscope.$on('stateNotFound',(e)=>{
            e.preventDefault();
            console.log('start')
        });
    }
}