import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/sign-in/sign-in.js';
import '../../ui/pages/sign-up/sign-up.js';
import '../../ui/pages/admin/admin.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/reset/reset-password.js';

import '../../ui/pages/patients/patients';
import '../../ui/pages/patient-page/patient-page';


let adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'admin-group',
  triggersEnter: [(context, redirect) => {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      redirect('/');
    }
  }],
});

var exposed = FlowRouter.group({
  triggersEnter: [function(context, redirect) {
  }]
});

var loggedIn = FlowRouter.group({
  triggersEnter: [
    function() {
      var route;
      if (!(Meteor.loggingIn() || Meteor.userId())) {
        route = FlowRouter.current();
        if (route.route.name !== 'login') {
          Session.set('redirectAfterLogin', route.path);
        }
        return FlowRouter.go('App.login');
      }
    }
  ]
});

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

loggedIn.route('/dashboard', {
  name: 'App.admin',
  action() {
    BlazeLayout.render('App_admin', { main: 'App_admin' });
  },
});

loggedIn.route('/patients', {
  name: 'App.patients',
  action() {
    BlazeLayout.render('App_patients', {
      main: 'App_patients'
    });
  },
});

loggedIn.route('/patient/:id', {
  name: 'App.patient',
  action() {
    BlazeLayout.render('App_patient_page', {
      main: 'App_patient_page'
    });
  },
});

FlowRouter.route('/change-password', {
  name: 'forgotpassword',
  action(){
    BlazeLayout.render('App_ForgotPassword', { main: 'App_ForgotPassword' });
  }
});

FlowRouter.route('/reset-password/:token', {
  name: 'resetpassword',
  action(){
    BlazeLayout.render('App_ResetPassword', { main: 'App_ResetPassword' });
  }
});

// Set up all routes in the app
FlowRouter.route('/sign-in', {
  name: 'App.login',
  action() {
    BlazeLayout.render('App_login', { main: 'App_login' });
  },
});

FlowRouter.route('/sign-up', {
  name: 'App.register',
  action() {
    BlazeLayout.render('App_register', { main: 'App_register' });
  },
});

FlowRouter.route('/sign-out', {
  name: 'App.logout',
  action() {
    Meteor.logout(function() {
      FlowRouter.go('/');
    });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};

///sign-in
//sign-out
//sign-up
//forgot-password
