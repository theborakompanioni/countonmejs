/*global CountOnMe,describe,it,expect*/
describe('CountOnMeJs.counter', function() {
  'use strict';

  it('should check the MAX_VALUE', function () {
    expect(CountOnMe.counter.MAX_VALUE).toBe(4294967296);
  });

  describe('Counter constructor', function() {
    it('should create a default Counter with and without ´new´', function () {
        var counter = CountOnMe.counter();
        expect(counter).toBeDefined();
        expect(counter.get()).toBe(0);

        var counter2 = new CountOnMe.counter();
        expect(counter2).toBeDefined();
        expect(counter2.get()).toBe(0);
    });

    it('should create a Counter initialized with 100', function () {
        var counter2 = CountOnMe.counter(100);
        expect(counter2).toBeDefined();
        expect(counter2.get()).toBe(100);
    });

    it('should create a Counter initialized with MAX_VALUE', function () {
        var counter2 = CountOnMe.counter(CountOnMe.counter.MAX_VALUE);
        expect(counter2).toBeDefined();
        expect(counter2.get()).toBe(4294967296);
    });

    it('should create a Counter initialized with a negative number (fallback to 0)', function () {
        var counter3 = CountOnMe.counter(-1);
        expect(counter3).toBeDefined();
        expect(counter3.get()).toBe(0);
    });
  });

  it('should clear a counter', function () {
    var counter = CountOnMe.counter(100);
    expect(counter.get()).toBe(100);
    expect(counter.clear()).toBe(100);
    expect(counter.get()).toBe(0);
  });

  it('should prevent counter from being decremented below zero', function () {
    var counter = CountOnMe.counter(0);
    expect(counter.inc(-20)).toBe(0);
    expect(counter.dec(-20)).toBe(20);
    expect(counter.clear()).toBe(20);
    expect(counter.get()).toBe(0);
  });

  it('should wrap counter if incrementing over MAX_VALUE', function () {
    var counter = CountOnMe.counter(100);
    expect(counter.get()).toBe(100);
    expect(counter.clear()).toBe(100);
    expect(counter.get()).toBe(0);
    expect(counter.inc(CountOnMe.counter.MAX_VALUE)).toBe(CountOnMe.counter.MAX_VALUE);
    expect(counter.inc()).toBe(1);
    expect(counter.dec()).toBe(0);
  });

  it('should count from 0 to 100 (+1)', function () {
    var counter = CountOnMe.counter();

    expect(counter.get()).toBe(0);
    for(var i = 1; i <= 100; i++) {
      expect(counter.inc()).toBe(i);
    }
    expect(counter.get()).toBe(100);
  });

  it('should count from 0 to 1 (0.1)', function () {
    var counter = CountOnMe.counter();

    expect(counter.get()).toBe(0);
    for(var i = 1; i <= 10; i++) {
      expect(counter.inc(0.1)).toBeCloseTo(i / 10, 5);
    }
    expect(counter.get()).toBeCloseTo(1, 5);
  });

  it('should count from 100 to 1 (-1)', function () {
    var counter = CountOnMe.counter(100);

    expect(counter.get()).toBe(100);
    for(var i = 99; i >= 0; i--) {
      expect(counter.dec()).toBe(i);
    }
    expect(counter.get()).toBe(0);
  });

});