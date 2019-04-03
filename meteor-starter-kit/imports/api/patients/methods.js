// Methods related to links

import {
    Meteor
} from 'meteor/meteor';
import {
    check
} from 'meteor/check';
import {
    Patients
} from './patients.js';

Meteor.methods({
    'patient.ping'(id, status, sensorStatus) {
        check(id, String);
        check(status, String);
        check(sensorStatus, Array);
    
        let newMongoObjectId = new Meteor.Collection.ObjectID();
        newMongoObjectId._str = id;

        return Patients.update({
            _id: newMongoObjectId
        }, {
            $set: {
                sensors: sensorStatus,
                connection: status,
                lastconnected: new Date()
            }
        });
    },
    'activity.update'(id, activity, status, icon) {
        check(id, String);
        check(activity, String);
        check(icon, String);

        let newMongoObjectId = new Meteor.Collection.ObjectID();
        newMongoObjectId._str = id;

        return Patients.update({
            _id: newMongoObjectId
        }, {
            $addToSet: {
                adl: {
                    name: activity,
                    status: status,
                    icon: icon
                },
            },
            $set: {
                lastconnected: new Date()
            }
        });

    },
    'sensorstatus.get'(url){
        check(url, String);

        HTTP.get(url, function(error, result) { 
            if (error) { 
                console.log('error', error); 
            } 
            if (result) { 
                 
            } 
        });

    }
});