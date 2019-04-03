import './patient.html';
import '../usercard/usercard'
import './component/activity-table/table'
import './component/sensor-table/sensor-table'
import './component/map/map'

import {
    Patients
} from '/imports/api/patients/patients.js';


Template.patient.onCreated(function () {
    var userid = FlowRouter.getParam("id");
    Meteor.subscribe('patient.find', userid);
});

Template.patient.onRendered(function () {

    Tracker.autorun(async () => {

        var userid = FlowRouter.getParam("id");

        let newMongoObjectId = new Meteor.Collection.ObjectID();
        newMongoObjectId._str = userid;

        let data = await Patients.find({
            _id: newMongoObjectId
        }).fetch();

        try {
            if (moment(data[0].lastconnected).isAfter(moment().subtract(1, 'minute'))) {
                $('.statusSegment').dimmer('hide');
            } else {
                $('.statusSegment').dimmer('show');
            }
        } catch (e) {
            //console.warn(e)
        }


    });

});

Template.patient.helpers({
    patient() {
        var userid = FlowRouter.getParam("id");

        let newMongoObjectId = new Meteor.Collection.ObjectID();
        newMongoObjectId._str = userid;

        let cursor = Patients.find({
            _id: newMongoObjectId
        });

        return cursor;
    }
});