/**
 * exchangeHome.js
 */
define(['app'], function (app) {
    //也可以使用这样的显式注入方式，angular执行controller函数前，会先读取$inject
    app.controller.$inject = ['$scope','$rootScope','$http','$state','$stateParams'];
    function controller($scope,$rootScope,$http,$stateParams,$state){
    	
    }
    return {controller:controller};
});