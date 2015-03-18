class TestService {

  static $inject = ['$http', '$log', '$q'];
  constructor(private $http, private $log, private $q) {

  }

  update() {
    return this.$q.when('updated!')
  }

}

angular.module('ngCmp.Services', [])
  .service('TestService', TestService);
