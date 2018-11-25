import './login.html';

if (Meteor.isClient) {
  Template.login.events({
    'submit form': function(event) {
      event.preventDefault();

      $('#loginBtn').addClass("loading");

      var emailVar = event.target.email.value;
      var passwordVar = event.target.password.value;

      Meteor.logoutOtherClients();
      Meteor.loginWithPassword(emailVar, passwordVar);

      Accounts.onLogin(function(){
        let user = this.userId / Meteor.user() / Meteor.user()._id
        let redirect = Session.get('redirectAfterLogin');

        $('#loginBtn').addClass("loading");


        if (redirect != null) {
          if (redirect !== '/login') {
            FlowRouter.go(redirect);
          }
        } else {
          FlowRouter.go('/');
          $('#loginBtn').removeClass("loading");
        }

      });

      Accounts.onLoginFailure(function(){
        $('#error-message').css("display", "block");
        $('#loginBtn').removeClass("loading");
      });


    }
  });
}

Template.login.onRendered(function () {
  $('.ui.form').form({
    fields: {
      email: {
        identifier  : 'email',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your e-mail'
          },
          {
            type   : 'email',
            prompt : 'Please enter a valid e-mail'
          }
        ]
      },
      password: {
        identifier  : 'password',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your password'
          },
          {
            type   : 'length[6]',
            prompt : 'Your password must be at least 6 characters'
          }
        ]
      }
    },
    inline: true,
    on: 'blur'
  });

});
