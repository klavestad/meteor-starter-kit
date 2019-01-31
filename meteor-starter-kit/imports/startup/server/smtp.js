Meteor.startup(() => {

    let email = "< ENTER EMAIL HERE >";
    let password = "< ENTER PASSWORD HERE >"
  
    process.env.MAIL_URL='smtp://' + email + ':' + password + '@smtp.mailgun.org:587';

    console.log(process.env.MAIL_URL);
  
    Accounts.emailTemplates.from = "MST <" + email + ">";
  
    Accounts.urls.resetPassword = function(token) {
      console.log('reset-password/' + token)
      return Meteor.absoluteUrl('reset-password/' + token);
    }
  
  });