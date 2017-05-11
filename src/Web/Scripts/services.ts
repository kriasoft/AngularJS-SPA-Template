'use strict';

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('app.services', [])

    .value('version', '1.0.0');