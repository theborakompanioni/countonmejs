/*global CountOnMe,describe,it,expect*/
describe('CountOnMeJs', function() {
  'use strict';

  it('check for global CountOnMe object', function () {
    expect(CountOnMe.counter).toBeDefined();
    expect(CountOnMe.stopwatch).toBeDefined();
  });

});