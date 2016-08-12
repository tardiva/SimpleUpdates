import { Template } from 'meteor/templating';
 
import './body.html';
import './accounts.js';
import './navigation.js';
import './projects.js';
import './updates.js';


Template.body.onCreated(function bodyOnCreated() {
 
  Meteor.subscribe('userRole');

  Meteor.subscribe('updates');

  Meteor.subscribe('projects');
  
});

Template.body.helpers({

            
});

Template.body.events({
   
    'click .menu-opt' (event) {
            
        let opt = event.target.closest('.menu-opt'),
            button = opt.closest('.dropdown').getElementsByClassName('dropdown-toggle').item(0);
        
        console.log(opt);
        console.log(opt.getAttribute("value"));
        
        button.innerHTML = opt.innerHTML;
        button.setAttribute("value", opt.getAttribute("value"));
    }, 

});





