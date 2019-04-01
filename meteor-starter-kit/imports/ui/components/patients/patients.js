import './patients.html';
import '../usercard/usercard'

import {
    Patients
} from '/imports/api/patients/patients.js';

Template.patients.onCreated(function () {
    Meteor.subscribe('patients.all');
});

Template.patients.helpers({
    patients() {
        return Patients.find({});
    },
});

Template.registerHelper('healthstatus', function (status) {
    console.log("Health status: ", status, status === "ok")
    return status === "ok";
});

Template.registerHelper('adlcount', function (name) {
    return name === undefined;
});

Template.registerHelper('checkConnection', function (lastconnected) {
    return moment(lastconnected).isAfter(moment().subtract(1, 'minute'));
});

Template.registerHelper('hasadlcheck', function (adl) {
    return adl.length > 0
});

Template.registerHelper('adlstatuscheck', function (status) {
    return status === 'error'
});

Template.registerHelper('checkError', function (connectionstatus) {
    return connectionstatus === "error"
});

Template.registerHelper('convertUserId', function (id) {
    return id._str;
});