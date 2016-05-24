describe('simple unit test', function() {
    var $compile,
        $rootScope;

    // Load the myApp module, which contains the directive
    beforeEach(module('app'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$state_, _$rootScope_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $state = _$state_;
        $rootScope = _$rootScope_;
    }));

    it('Should redirect to login', function() {
        // Compile a piece of HTML containing the directive

        $state.get("index.table", {name:'direct.banner_groups'});
        $rootScope.$apply();
        expect($state.current.name).toBe("login");

    });
});