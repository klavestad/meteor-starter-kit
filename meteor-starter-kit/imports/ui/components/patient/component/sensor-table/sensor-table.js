import './sensor-table.html'

import {
    Meteor
} from 'meteor/meteor'

Template.registerHelper('checkSensorStatus', function (status) {
    return status != 'error';
});