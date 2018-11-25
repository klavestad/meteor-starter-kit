import { Meteor } from 'meteor/meteor';

import './page.html';
import '../navigation/navigation.js';

Template.page.events({
  'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();
  }
});

Template.page.onCreated(function () {
  $('.ui.dropdown').dropdown();
});

Template.page.onRendered(function () {
  $('.ui.dropdown').dropdown();

  $('.ui.search')
  .search({
    type: 'category',
    source: pageContent
  });
});

var pageContent = [
  { category: 'Dashboard', title: 'Currency Rate', url: '/dashboard'},
  { category: 'Dashboard', title: 'People in the World', url: '/dashboard'},
  { category: 'Dashboard', title: 'Stock Prices', url: '/dashboard'},
]
