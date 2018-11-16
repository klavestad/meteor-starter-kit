import './login.html';

if (Meteor.isClient) {
  Template.login.events({
    'submit form': function(event) {
      event.preventDefault();

      var emailVar = event.target.email.value;
      var passwordVar = event.target.password.value;

      Meteor.loginWithPassword(emailVar, passwordVar);
      Meteor.logoutOtherClients();

      Accounts.onLogin(function(){
        var user = this.userId / Meteor.user() / Meteor.user()._id
        console.log(user)

        FlowRouter.go('/');
      });

      Accounts.onLoginFailure(function(){
        $('#error-message').css("display", "block");
      });

    }
  });
}

Template.login.onRendered(function () {

  $('.ui.checkbox').checkbox();
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
