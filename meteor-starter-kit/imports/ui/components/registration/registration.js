import './registration.html';

if (Meteor.isClient) {
  Template.registration.events({
    'submit form': function(event) {
      event.preventDefault();

      var emailVar = event.target.email.value;
      var passwordVar = event.target.password.value;

      Accounts.createUser({
        email: emailVar,
        password: passwordVar
      });

      Meteor.loginWithPassword(emailVar, passwordVar);

      FlowRouter.go('/');

    }
  });
}

Template.registration.onRendered(function () {

  $('.ui.checkbox').checkbox();
  $('.ui.form')
    .form({
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
    })
  ;

});
