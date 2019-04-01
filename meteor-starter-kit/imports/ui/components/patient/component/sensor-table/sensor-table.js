import './sensor-table.html'

import {
    Meteor
} from 'meteor/meteor'

getStatus = async () => {
    const data = await fetch('http://10.32.3.108:4000/api/status') //RPI
    //const data = await fetch('http://localhost:4000/api/status') //RPI
    const json = await data.json();
    const array = new Array();
    const temp = Object.assign({}, json)
    for (let [key, value] of Object.entries(temp)) {
        const obj = {}
        obj.name = key
        obj.status = value
        array.push(obj);
    }

    return array;
}

Template.sensor_table.onCreated(function () {
    this.status = new ReactiveVar(0)
    var self = this

    getStatus().then(array => {
        self.status.set(array)
    })
})

Template.sensor_table.helpers({
    sensorStatus() {
        console.log(Template.instance().status.get())
        return Template.instance().status.get()
    }
});

Template.registerHelper('checkSensorStatus', function (status) {
    console.log(status)
    return status != 'error';
});