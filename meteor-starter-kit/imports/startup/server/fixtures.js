import {
  Meteor
} from 'meteor/meteor';
import {
  Patients
} from '../../api/patients/patients.js';

Meteor.startup(() => {
  // if the Links collection is empty
  if (Patients.find().count() === 0) {
    const data = [{
        id: '1001',
        name: 'Sindre Klavestad',
        age: '79',
        address: "Christian Kroghs Gate 32, 0186 Oslo",
        description: "Patient is suffering from insomnia due to working on the master thesis",
        imgsrc: "https://semantic-ui.com/images/avatar2/large/matthew.png",
        connection: "ok",
        health: "ok",
        lastconnected: new Date(),
        adl: [],
        sensors: []
      },
      {
        id: '1002',
        name: 'Ola Nordmann',
        age: '84',
        address: "Christian Kroghs Gate 32, 0186 Oslo",
        description: "Patient is suffering from dementia",
        imgsrc: "https://semantic-ui.com/images/avatar/large/steve.jpg",
        connection: "ok",
        health: "ok",
        lastconnected: new Date(),
        adl: [],
        sensors: []
      },
      {
        id: '1003',
        name: 'Kari Nordmann',
        age: '86',
        address: "Christian Kroghs Gate 32, 0186 Oslo",
        description: "Patient has a history of backproblems",
        imgsrc: "https://semantic-ui.com/images/avatar2/large/molly.png",
        connection: "ok",
        health: "ok",
        lastconnected: new Date(),
        adl: [],
        sensors: []
      },
    ];

    data.forEach(patient => Patients.insert(patient));
  }
});