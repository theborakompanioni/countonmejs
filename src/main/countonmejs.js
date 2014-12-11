/**
 * @license
 * CountOnMeJs <http://example.com/>
 * Copyright 2014 tbk <theborakompanioni+git@gmail.com>
 * Available under MIT license <http://opensource.org/licenses/MIT>
 */
 ;(function(window) {
  'use strict';

    // performance.now and date polyfills
    (function (window) {
        // polyfill for Date.now()
        // @href https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
        if (!Date.now) {
           Date.now = function() {
             return new Date().getTime();
           };
        }

        // @href https://developer.mozilla.org/en-US/docs/Web/API/Performance.now
        if(!window.performance) {
            window.performance = window.performance || {};
            // handle vendor prefixing
            window.performance.now = window.performance.now ||
            window.performance.mozNow ||
            window.performance.msNow ||
            window.performance.oNow ||
            window.performance.webkitNow ||
            Date.now;  // fallback to Date
        }
    })(window);

    var Counter = (function() {
        var MAX_VALUE = Math.pow(2, 32); // 4294967296

        var check = function(val) {
          return +val !== val ? 1 : +val;
        };

        function Counter(val) {
            if (!(this instanceof Counter)) {
                return new Counter(val);
            }

            if (+val !== val || val < 0) {
              val = 0;
            }
            this._$ = { i : val };
        }

        Counter.MAX_VALUE = MAX_VALUE;

        Counter.prototype.inc = function(val) {
          this.set(this.get() + check(val));
          return this.get();
        };

        Counter.prototype.dec = function(val) {
          return this.inc(check(val) * -1);
        };

        Counter.prototype.clear = function() {
          var val = this._$.i;
          this._$.i = 0;
          return val;
        };

        Counter.prototype.get = function() {
          return this._$.i;
        };

        Counter.prototype.set = function(val) {
          this._$.i = check(val);

          if (this._$.i < 0) {
            this._$.i = 0;
          } else if (this._$.i > MAX_VALUE) {
            this._$.i -= MAX_VALUE;
          }

          return this.get();
        };

        return Counter;
    }());

    var StopWatch = (function() {
        var now = function(performance) {
             return !!performance ? window.performance.now() : Date.now();
        };
        var asNumberOr = function(optNumber, fallback) {
            return +optNumber === optNumber ? +optNumber : fallback;
        };
        function StopWatch(config) {
            if (!(this instanceof StopWatch)) {
                return new StopWatch(config);
            }
            this._config = config || {};
            this._config.performance = this._config.performance === true;
            this._$ = {
               ts : 0, // time start
               te : 0, // time end
               r : false // currently running
            };
        }

        StopWatch.prototype._orNow = function(optNow) {
            return asNumberOr(optNow, now(this._config.performance));
        };

        StopWatch.prototype.startIf = function(condition, optNow) {
            if(condition) {
              this._$.r = true;
              this._$.ts = this._orNow(optNow);
              this._$.te = null;
            }
            return this;
        };

        StopWatch.prototype.start = function(optNow) {
            return this.startIf(!this._$.r, optNow);
        };

        StopWatch.prototype.restart = function(optNow) {
            return this.startIf(true, optNow);
        };

        StopWatch.prototype.stop = function (optNow) {
            return this.stopIf(true, optNow);
        };

        StopWatch.prototype.stopIf = function (condition, optNow) {
            if(this._$.r && condition) {
              this._$.te = this._orNow(optNow);
              this._$.r = false;
            }
            return this;
        };

        StopWatch.prototype.interim = function (optNow) {
            if (!this._$.r) {
                return 0;
            }

            return this._orNow(optNow) - this._$.ts;
        };

        StopWatch.prototype.get = function (optNow) {
            if(this._$.te) {
                return this._$.te - this._$.ts;
            }

            return this.time(optNow);
        };

        StopWatch.prototype.running = function () {
            return this._$.r;
        };

        // restartIf(...).get() would not work
        StopWatch.prototype.getAndRestartIf = function(condition, optNow) {
            var time = this.get(optNow);
            if(condition) {
              this.restart(optNow);
            }

            return time;
        };

        StopWatch.prototype.forceStart = StopWatch.prototype.restart;
        StopWatch.prototype.time =  StopWatch.prototype.interim;

        return StopWatch;
    }());

    window.CountOnMe = {
        counter: Counter,
        stopwatch: StopWatch
    };

}(window));