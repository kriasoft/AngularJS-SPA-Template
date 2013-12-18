/// <reference path="services.ts" />

'use strict';

describe('Services', () => {
    beforeEach(module('app.services'));

    describe('version', () => {
        it('should return current version', inject((version) => {
            expect(version).toEqual('1.0.0');
        }));
    });
});