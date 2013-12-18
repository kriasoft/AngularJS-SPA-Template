/// <reference path="directives.ts" />

'use strict';

describe('Directives', () => {
    beforeEach(module('app.directives'));

    describe('app-version', () => {
        it('should print current version', () => {
            module(($provide) => {
                $provide.value('version', 'TEST_VER');
            });
            inject(($compile, $rootScope) => {
                var element = $compile('<span app-version></span>')($rootScope);
                expect(element.text()).toEqual('TEST_VER');
            });
        });
    });
});