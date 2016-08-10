FlowRouter.route( '/', {
    name: 'login',
    action () {
    BlazeLayout.render( 'app_layout', { main: 'login'} );    
    },
  });

FlowRouter.route( '/home', {
    name: 'home',
    action () {
    if (Meteor.userId()){    
    BlazeLayout.render( 'app_layout', { nav: 'navigation', main: 'updates_templ'} );    
    }
  },
  });

FlowRouter.route( '/projects', {
    name: 'projects',
    action () {
    if (Meteor.userId()){    
    BlazeLayout.render( 'app_layout', { nav: 'navigation', main: 'projects_templ'} );    
    }
  },
  });

FlowRouter.route( '/users', {
    name: 'users',
    action () {
    if (Meteor.userId()){    
    BlazeLayout.render( 'app_layout', { nav: 'navigation', main: 'signup'} );    
    }
  },
  });

FlowRouter.route( '/signup', {
    name: 'signup',
    action () {
    BlazeLayout.render( 'app_layout', { main: 'signup'} );    
     },
  });
