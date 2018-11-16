import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { MakeChart } from '../../../lib/utilities/chart.js';

import './dashboard.html';

let label = ["test", "test2", "test", "test", "test", "test", "test", "test"];
let wifidata = [200, 300, 220, 110, 566, 233, 123, 555];
let dblevels = [100, 400, 200, 300, 500, 200, 100, 900];

Template.dashboard.onRendered(function () {

  $('.ui.sidebar').sidebar('toggle');

  const chart = new MakeChart();

  this.autorun(() => {
    let lim = parseInt(FlowRouter.getQueryParam('limit')) || 50;
    let idParam = FlowRouter.getParam('_id');

    //Get Data from DB
    //const records = Records.find({name: idParam});

    chart.update(dblevels, wifidata, label);
  });


});
