import './page.html';

Template.page.events({
  'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();
  }
});

Template.page.onRendered(function () {

});
