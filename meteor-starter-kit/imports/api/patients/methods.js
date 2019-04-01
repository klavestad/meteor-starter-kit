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
    'patient.ping'(id, status) {
        check(id, String);
        check(status, String);

        let newMongoObjectId = new Meteor.Collection.ObjectID();
        newMongoObjectId._str = id;

        return Patients.update({
            _id: newMongoObjectId
        }, {
            $set: {
                connection: status,
                lastconnected: new Date()
            }
        });
    },
    'activity.update'(id, activity, status) {
        check(id, String);
        check(activity, String);

        let newMongoObjectId = new Meteor.Collection.ObjectID();
        newMongoObjectId._str = id;

        return Patients.update({
            _id: newMongoObjectId
        }, {
            $addToSet: {
                adl: {
                    name: activity,
                    status: status,
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