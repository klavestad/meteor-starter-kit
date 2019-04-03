import './navigation.html';

Template.navigation.onRendered(function () {
  $('.ui.dropdown').dropdown();
});

Template.navigation.helpers({
  email() {
    if (Meteor.user()) {
      return Meteor.user().emails[0].address;
    }
  },
});