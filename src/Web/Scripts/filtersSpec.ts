/// <reference path="filters.ts" />

'use strict';

describe('Filters', () => {
    beforeEach(module('app.filters'));

    describe('interpolate', () => {
        beforeEach(module(($provide) => {
            $provide.value('version', 'TEST_VER');
        }));

        it('should replace VERSION', inject((interpolateFilter) => {
            expect(interpolateFilter('before %VERSION% after')).toEqual('before TEST_VER after');
        }));
    });
});