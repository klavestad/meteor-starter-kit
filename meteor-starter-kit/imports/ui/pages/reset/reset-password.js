import swal from 'sweetalert';
import './reset-password.html';

Template.App_ForgotPassword.events({
  'click #resetBtn': function(e, t) {

    e.preventDefault();

    // var forgotPasswordForm = $(e.currentTarget);
    // console.log(forgotPasswordForm);
    var email , trimInput ;

    // var emailVar = e.target.email.value;
    var emailVar = $("input[name=email]").val();
    console.log("emailVar : " + emailVar);

    trimInput = function(val) {
      return val.replace(/^\s*|\s*$/g, "");
    }

    emailtrim = trimInput(emailVar);
    email = emailtrim.toLowerCase();

    Accounts.forgotPassword({email: email}, function(err) {
      console.log("Changing password")
      if (err) {
        if (err.message === 'User not found [403]') {
          console.log('This email does not exist.');
          Bert.alert('This email does not exist.', 'error');
          $('#error-message').css("display", "block");
        } else {
          console.log('We are sorry but something went wrong.');
          Bert.alert('We are sorry but something went wrong.', 'error');
          $('#error-message').css("display", "block");
        }
      } else {
        console.log('Email Sent. Check your mailbox.');
        Bert.alert('Email Sent. Check your mailbox.', 'success');
        $('#success-message').css("display", "block");
      }
    });

    //Bert.alert( "Reset instruction is sent by e-mail!", 'success', 'growl-top-right' );
    return false;


  },
});

Template.App_ForgotPassword.onCreated(function() {
  if (Accounts._resetPasswordToken) {
  // var resetPassword = FlowRouter.getParam('token');
  Session.set('resetPassword', Accounts._resetPasswordToken);
  console.log('ResetPasswordtemplate : ' + resetPassword);
  }
});

Template.App_ResetPassword.helpers({
  resetPassword: function(){
  // console.log('ResetPassword : ' + resetPassword);
  var resetPassword = FlowRouter.getParam('token');
  // console.log('ResetPassword : ' + resetPassword);
  return resetPassword;
  // return Session.get('resetPassword');

  },
});


Template.App_ResetPassword.events({
  'click #changePassword': function(e, t) {
    e.preventDefault();

    var resetPassword = FlowRouter.getParam('token');
    // console.log('ResetPassword : ' + resetPassword);
    let resetPasswordForm = $(e.currentTarget);
    let password = $("input[name=password]").val();
    let passwordConfirm = $("input[name=password-confirm]").val();

    //Check password is at least 6 chars long
    var isValidPassword = function(password, passwordConfirm) {
       if (password === passwordConfirm) {
        console.log('passwordVar.length'+ password.length >= 6 ? true : false);
         return password.length >= 6 ? true : false;
       } else {
         return swal({
            title: 'Passwords dont match',
            text: 'Please try again',
            showConfirmButton: true,
            type: 'error'
         }); //End of error swal
       } //End of else
     }

     if (isValidPassword(password, passwordConfirm)) {
        // if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
        Accounts.resetPassword(resetPassword, password, function(err) {
          if (err) {
            console.log('We are sorry but something went wrong.');
          } else {
            console.log('Your password has been changed. Welcome back!');
            Session.set('resetPassword', null);
            FlowRouter.go('/');
            return swal({
               title: 'Welcome back!',
               text: 'Your password has been changed.',
               showConfirmButton: true,
               type: 'success'
            }); //End of error swal
          }
        });
        } else {
          return swal({
            title: "Your password should be at least 6 characters long",
            text: "Please try again",
            timer: 1700,
            showConfirmButton: false,
            type: "error"
          });
        }

      return false;

  }
});
