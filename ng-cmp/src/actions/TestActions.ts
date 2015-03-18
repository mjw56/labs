/// <reference path="../../typings/tsd.d.ts" />

class TestActions {

  static $inject = ['$log', 'TestService', 'Dispatcher'];
  constructor(private $log: ng.ILogService, private TestService, private dispatcher) {

  }

  update(field: string) {
    this.TestService.update(field).then((result) => {
      // dispatch
      this.$log.debug('yis');

      this.dispatcher.dispatch({
        message: 'yis'
      });
    });
  }

}

angular.module('ngCmp.Actions', ['ngCmp.Dispatcher'])
  .service('TestActions', TestActions);
