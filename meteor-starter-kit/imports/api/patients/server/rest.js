import '../patients'
import bodyParser from 'body-parser';

Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({
    extended: false
}));

var GET = Picker.filter(function (request, response) {
    return request.method == "GET";
});

GET.route('/reset', function (params, request, response, next) {
    const body = request.body;
    const id = params.query.id;

    console.log(body);
    console.log(params);

    Meteor.call('activity.reset', id, function (err, data) {
        if (err) {
            response.setHeader('Content-Type', 'application/json');
            response.statusCode = 404;
            response.end("Something went wrong!!");
        } else {
            response.setHeader('Content-Type', 'application/json');
            response.statusCode = 200;
            response.end("OK!");
        }
    });

});

var POST = Picker.filter(function (request, response) {
    return request.method == "POST";
});

POST.route('/ping', function (params, request, response, next) {

    const body = request.body;
    console.log(body);
    let sensors = []

    Object.keys(body.sensorStatus).forEach(function (key) {
        sensors.push({
            name: key,
            status: body.sensorStatus[key]
        });
    });

    Meteor.call('patient.ping', body.id, body.status, sensors, function (err, data) {
        if (err) {
            response.setHeader('Content-Type', 'application/json');
            response.statusCode = 404;
            response.end("Something went wrong!!");
        } else {
            response.setHeader('Content-Type', 'application/json');
            response.statusCode = 200;
            response.end("OK!");
        }
    });

});

POST.route('/update', function (params, request, response, next) {

    const body = request.body;
    const icons = {
        Sleeping: "bed",
        Cooking: "fire",
        Showering: "bath",
        Toilet: "tint",
        Eating: "utensils",
        Mobility: "streat view"
    }

    Meteor.call('activity.update', body.id, body.activity, body.status, icons[body.activity] ? icons[body.activity] : 'file', function (err, data) {
        if (err) {
            console.log(err.error);
        } else {
            console.log("Success: ", data);
        }
    });

    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 200;
    response.end("OK!");

});