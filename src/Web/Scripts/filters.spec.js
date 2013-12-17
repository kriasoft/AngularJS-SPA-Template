/// <reference path="_references.js" />
/// <reference path="filters.js" />

'use strict';

describe('Filter', function () {
    beforeEach(module('app.filters'));

    describe('interpolate', function () {
        beforeEach(module(function ($provide) {
            $provide.value('version', 'TEST_VER');
        }));

        it('should replace VERSION', inject(function (interpolateFilter) {
            expect(interpolateFilter('before %VERSION% after')).toEqual('before TEST_VER after');
        }));
    });
});