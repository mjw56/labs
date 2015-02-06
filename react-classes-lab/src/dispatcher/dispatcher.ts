/*
* Copyright (c) 2014, Facebook, Inc.
* All rights reserved.
*
* This source code is licensed under the BSD-style license found in the
* LICENSE file in the root directory of this source tree. An additional grant
* of patent rights can be found in the PATENTS file in the same directory.
*
* @providesModule Dispatcher
* @typechecks
*/

module Dispatcher {
  "use strict";

  export interface IDispatcher {
    /**
    * Registers a callback to be invoked with every dispatched payload. Returns
    * a token that can be used with `waitFor()`.
    *
    * @param {function} callback
    * @return {string}
    */
    register(callback: Function): string;

    /**
    * Removes a callback based on its token.
    *
    * @param {string} id
    */
    unregister(id: string): void;

    /**
    * Waits for the callbacks specified to be invoked before continuing execution
    * of the current callback. This method should only be used by a callback in
    * response to a dispatched payload.
    *
    * @param {array<string>} ids
    */
    waitFor(ids: string[]): void;

    /**
    * Dispatches a payload to all registered callbacks.
    *
    * @param {object} payload
    */
    dispatch(payload: any): void;

    /**
    * Is this Dispatcher currently dispatching.
    *
    * @return {boolean}
    */
    isDispatching(): boolean;
  }

  class Dispatcher implements IDispatcher {

    _lastID: number;
    _prefix: string;
    $Dispatcher_callbacks: any;
    $Dispatcher_isPending: any;
    $Dispatcher_isHandled: any;
    $Dispatcher_isDispatching: boolean;
    $Dispatcher_pendingPayload: boolean;

    constructor() {
      this._lastID = 1;
      this._prefix = 'ID_';
      this.$Dispatcher_callbacks = {};
      this.$Dispatcher_isPending = {};
      this.$Dispatcher_isHandled = {};
      this.$Dispatcher_isDispatching = false;
      this.$Dispatcher_pendingPayload = null;
    }

    register(callback) {
      var id = this._prefix + this._lastID++;
      this.$Dispatcher_callbacks[id] = callback;
      return id;
    }

    unregister(id) {
      this.invariant(
        this.$Dispatcher_callbacks[id],
        'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
        id
      );
      delete this.$Dispatcher_callbacks[id];
    }

    waitFor(ids) {
      this.invariant(
        this.$Dispatcher_isDispatching,
        'Dispatcher.waitFor(...): Must be invoked while dispatching.'
      );
      for (var ii = 0; ii < ids.length; ii++) {
        var id = ids[ii];

        if (this.$Dispatcher_isPending[id]) {
          this.invariant(
            this.$Dispatcher_isHandled[id],
            'Dispatcher.waitFor(...): Circular dependency detected while ' +
            'waiting for `%s`.',
            id
          );
          continue;
        }

        this.invariant(
          this.$Dispatcher_callbacks[id],
          'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
          id
        );
        this.$Dispatcher_invokeCallback(id);
      }
    }

    dispatch(payload) {
      this.invariant(
        !this.$Dispatcher_isDispatching,
        'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
      );

      this.$Dispatcher_startDispatching(payload);
      try {
        for (var id in this.$Dispatcher_callbacks) {
          if (this.$Dispatcher_isPending[id]) {
            continue;
          }
          this.$Dispatcher_invokeCallback(id);
        }
      } finally {
        this.$Dispatcher_stopDispatching();
      }
    }

    isDispatching() {
      return this.$Dispatcher_isDispatching;
    }

    invariant(condition?, format?, a?, b?, c?, d?, e?, f?) {
      if (false) {
        if (format === undefined) {
          throw new Error('invariant requires an error message argument');
        }
      }

      if (!condition) {
        var error;
        if (format === undefined) {
          error = new Error(
            'Minified exception occurred; use the non-minified dev environment ' +
            'for the full error message and additional helpful warnings.'
          );
        } else {
          var args = [a, b, c, d, e, f];
          var argIndex = 0;
          error = new Error(
            'Invariant Violation: ' +
            format.replace(/%s/g, function () { return args[argIndex++]; })
          );
        }

          error.framesToPop = 1; // we don't care about invariant's own frame
          throw error;
        }
      }


      /**
      * Call the callback stored with the given id. Also do some internal
      * bookkeeping.
      *
      * @param {string} id
      * @internal
      */
      private $Dispatcher_invokeCallback(id) {
        this.$Dispatcher_isPending[id] = true;
        this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
        this.$Dispatcher_isHandled[id] = true;
      }

      /**
      * Set up bookkeeping needed when dispatching.
      *
      * @param {object} payload
      * @internal
      */
      private $Dispatcher_startDispatching(payload) {
        for (var id in this.$Dispatcher_callbacks) {
          this.$Dispatcher_isPending[id] = false;
          this.$Dispatcher_isHandled[id] = false;
        }
        this.$Dispatcher_pendingPayload = payload;
        this.$Dispatcher_isDispatching = true;
      }

      /**
      * Clear bookkeeping used for dispatching.
      *
      * @internal
      */
      private $Dispatcher_stopDispatching() {
        this.$Dispatcher_pendingPayload = null;
        this.$Dispatcher_isDispatching = false;
      }
  }

}
