import { Template } from 'meteor/templating';

import './navigation.html';

Template.navigation.events({
       
    'click .logout' (event) {
        
      event.preventDefault();
      Meteor.logout();
      //check succesfull logout / error here
      FlowRouter.go("/");//if succesful logout
    },
    
    'click .projects-link' (event) {
        
      event.preventDefault();
      FlowRouter.go("/projects");
    },
    
    'click .updates-link' (event) {
        
      event.preventDefault();
      FlowRouter.go("/home");
    },
    
    'click .users-link' (event) {
        
      event.preventDefault();
      FlowRouter.go("/users");
    },
        
});