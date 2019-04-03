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
    
        return Patients.update({
            id: id
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

        return Patients.update({
            id: id
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