/// <chutzpah_reference path="vendor/angular.min.js" />
/// <chutzpah_reference path="vendor/angular-mocks.js" />
/// <reference path="typings/jasmine/jasmine.d.ts" />
/// <reference path="typings/angularjs/angular-mocks.d.ts" />
/// <reference path="typings/jasmine/jasmine.d.ts" />
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