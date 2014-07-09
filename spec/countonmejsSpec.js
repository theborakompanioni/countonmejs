/*global CountOnMe,describe,it,expect*/
describe('CountOnMeJs.counter', function() {
  'use strict';

  it('should get the version of CountOnMeJs', function () {
    expect(CountOnMe.version).toBe('0.1.0');
  });

});