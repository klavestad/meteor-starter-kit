// All links-related publications

import {
    Meteor
} from 'meteor/meteor';
import {
    Patients
} from '../patients.js';

Meteor.publish('patients.all', function () {
    return Patients.find();
});

Meteor.publish('patient.find', function (id) {
    console.log("Searching for: ", id);
    let newMongoObjectId = new Meteor.Collection.ObjectID();
    newMongoObjectId._str = id;

    let cursor = Patients.find({
        _id: newMongoObjectId
    });
    
    return cursor
});