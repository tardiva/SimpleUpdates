FlowRouter.route( '/', {
    name: 'login',
    action () {
    BlazeLayout.render( 'app_layout', { main: 'login'} );    
    console.log( "Okay, we're on the Login page!" );
  },
  });

FlowRouter.route( '/home', {
    name: 'home',
    action () {
    if (Meteor.userId()){    
    BlazeLayout.render( 'app_layout', { nav: 'navigation', main: 'updates_templ'} );    
    console.log( "Okay, we're on the Home page!" );
    }
  },
  });

FlowRouter.route( '/projects', {
    name: 'projects',
    action () {
    if (Meteor.userId()){    
    BlazeLayout.render( 'app_layout', { nav: 'navigation', main: 'projects_templ'} );    
    console.log( "Okay, we're on the Projects page!" );
    }
  },
  });

FlowRouter.route( '/users', {
    name: 'users',
    action () {
    if (Meteor.userId()){    
    BlazeLayout.render( 'app_layout', { nav: 'navigation', main: 'signup'} );    
    console.log( "Okay, we're on the Users page!" );
    }
  },
  });

/*FlowRouter.route( '/home', {
  name: 'home',
    action () {
    console.log( "Okay, we're on the Home page!" );
  },
});*/