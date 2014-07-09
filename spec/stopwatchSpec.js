/*global CountOnMe,describe,it,expect,beforeEach,afterEach,jasmine*/
describe('CountOnMeJs.stopwatch', function() {
  'use strict';

  var noop = function() {};

  var update = noop;
  var update2 = noop;
  var update3 = noop;

  var stopwatch = null;

  beforeEach(function() {
      update = jasmine.createSpy('update');
      update2 = jasmine.createSpy('update2');
      update3 = jasmine.createSpy('update3');

     jasmine.clock().install();

     stopwatch = CountOnMe.stopwatch();

     //var baseTime = new Date(2013, 9, 23);
     //jasmine.clock().mockDate(baseTime);
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
     expect(stopwatch.start(0).time(0)).toBe(0);

     jasmine.clock().tick(100);

     expect(stopwatch.time(100)).toBe(100);
     expect(stopwatch.restart(0).time(0)).toBe(0);

     jasmine.clock().tick(5000);

     expect(stopwatch.time(5000)).toBe(5000);
     expect(stopwatch.restart().time()).toBeCloseTo(0,0);

     expect(stopwatch.stop().running()).toBe(false);
  });

  it('should test getAndRestartIf', function () {
    expect(stopwatch.start(0).getAndRestartIf(false, 0)).toBe(0);

    jasmine.clock().tick(100);

    expect(stopwatch.time(100)).toBe(100);
    expect(stopwatch.getAndRestartIf(true, 100)).toBe(100);
    expect(stopwatch.time(100)).toBe(0);

    jasmine.clock().tick(5000);

    expect(stopwatch.time(5100)).toBe(5000);

    expect(stopwatch.stop().running()).toBe(false);
  });

  it('should test stopIf', function () {
    expect(stopwatch.start(0).time(0)).toBe(0);

    expect(stopwatch.stopIf(false, 0).get(0)).toBe(0);
    expect(stopwatch.running()).toBe(true);

    expect(stopwatch.stopIf(true, 10).get(20)).toBe(10);
    expect(stopwatch.running()).toBe(false);
  });

  it('should count 0ms', function () {
    expect(stopwatch.start(0).stop(0).get()).toBe(0);

    jasmine.clock().tick(5000);

    expect(stopwatch.get(5000)).toBe(0);
  });

  it('should count 1000ms', function () {
    expect(stopwatch.start(0).get(0)).toBe(0);
    expect(stopwatch.start(0).get(100)).toBe(100);

    jasmine.clock().tick(1000);

    stopwatch.stop(1000);

    jasmine.clock().tick(1000);

    expect(stopwatch.get()).toBe(1000);
  });

});