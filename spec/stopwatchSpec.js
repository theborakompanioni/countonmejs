/*global CountOnMe,describe,it,expect,beforeEach,afterEach,jasmine*/
describe('CountOnMeJs.stopwatch', function() {
  'use strict';

  describe('with mocked date', function() {
      var stopwatch = null;

      beforeEach(function() {
        jasmine.clock().install();

        stopwatch = CountOnMe.stopwatch();

        jasmine.clock().mockDate();
      });

      afterEach(function() {
        stopwatch.stop();

        jasmine.clock().uninstall();
      });

      it('should create a StopWatch instance', function () {
        expect(stopwatch).toBeDefined();
        expect(stopwatch.time()).toBe(0);
        expect(stopwatch.interim()).toBe(0);
        expect(stopwatch.get()).toBe(0);
        expect(stopwatch.running()).toBe(false);
      });

      it('should create a StopWatch instance with and without ´new´', function () {
        var stopwatch = new CountOnMe.stopwatch();
        expect(stopwatch).toBeDefined();

        var stopwatch2 = CountOnMe.stopwatch();
        expect(stopwatch2).toBeDefined();
       });

      it('should test restart', function () {
        expect(stopwatch.start().time()).toBe(0);

        jasmine.clock().tick(100);

        expect(stopwatch.time()).toBe(100);
        expect(stopwatch.restart().time()).toBe(0);

        jasmine.clock().tick(5000);

        expect(stopwatch.time()).toBe(5000);
        expect(stopwatch.restart().time()).toBeCloseTo(0,0);

        expect(stopwatch.stop().running()).toBe(false);
      });

      it('should test getAndRestartIf', function () {
        expect(stopwatch.start().getAndRestartIf(false)).toBe(0);

        jasmine.clock().tick(100);

        expect(stopwatch.time()).toBe(100);
        expect(stopwatch.getAndRestartIf(true)).toBe(100);
        expect(stopwatch.time()).toBe(0);

        jasmine.clock().tick(5000);

        expect(stopwatch.time()).toBe(5000);

        expect(stopwatch.stop().running()).toBe(false);
      });

      it('should test startIf', function () {
        expect(stopwatch.startIf(true).time()).toBe(0);

        jasmine.clock().tick(10);

        expect(stopwatch.get()).toBe(10);

        jasmine.clock().tick(10);

        expect(stopwatch.get()).toBe(20);

        expect(stopwatch.running()).toBe(true);
        expect(stopwatch.stop().running()).toBe(false);

        jasmine.clock().tick(1000);

        expect(stopwatch.startIf(false).get()).toBe(20);
        expect(stopwatch.running()).toBe(false);
      });

      it('should test stopIf', function () {
        expect(stopwatch.start().time()).toBe(0);

        expect(stopwatch.stopIf(false).get()).toBe(0);
        expect(stopwatch.running()).toBe(true);

        jasmine.clock().tick(10);

        expect(stopwatch.stopIf(true).get()).toBe(10);

        expect(stopwatch.running()).toBe(false);
      });

      it('should count 0ms', function () {
        expect(stopwatch.start().stop().get()).toBe(0);

        jasmine.clock().tick(5000);

        expect(stopwatch.get()).toBe(0);
      });

      it('should count 1000ms', function () {
        expect(stopwatch.start().get()).toBe(0);

        jasmine.clock().tick(1000);

        stopwatch.stop();

        jasmine.clock().tick(1000);

        expect(stopwatch.get()).toBe(1000);
      });

      it('should count 1000ms by using mocked values', function () {
        expect(stopwatch.start(100).get(110)).toBe(10);
        expect(stopwatch.get(1100)).toBe(1000);
      });
  });

  describe('with mocked date', function() {
      /**
       * Unlike other timing data available to JavaScript (for example Date.now),
       * the timestamps returned by Performance.now() are not limited to one-millisecond
       * resolution. Instead, they represent times as floating-point numbers
       * with up to microsecond precision.
       *
       * Because we cannot be certain about exactly when
       * the callbacks from `setTimeout` will be invoked, we have to use
       * `toBeGreaterThan` and `toBeLessThan` instead of `toBeCloseTo`.
       */
      it('should test with performance measuring', function (done) {
        var stopwatch = CountOnMe.stopwatch({ performance: true });

        expect(stopwatch.start().time()).toBeCloseTo(0, 0);

        setTimeout(function() {
          expect(stopwatch.time()).toBeGreaterThan(18);
          expect(stopwatch.time()).toBeLessThan(18 + 5);
          expect(stopwatch.restart().time()).toBeCloseTo(0, 0);
        }, 20);

        setTimeout(function() {
          expect(stopwatch.time()).toBeGreaterThan(11);
          expect(stopwatch.time()).toBeLessThan(11 + 5);
          expect(stopwatch.restart().time()).toBeCloseTo(0, 0);

          done();
        }, 33);
      });
  });
});