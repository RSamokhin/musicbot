var models = require('../models/'),
    Sequelize = require('sequelize');

module.exports.syncData = function () {
    var syncData = require('../config/sync-data.json');
    syncData.forEach(function (d) {
        if (d.sync) {
            models[d.name].destroy({where: {}});
            var tmpData = require(d.require);
            tmpData.forEach(function (n) {
                models[d.name].create(n);
            });
        }
    });
};