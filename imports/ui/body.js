import { Template } from 'meteor/templating';
//import { Projects, Updates } from '../api/projects.js';
 
import './body.html';
import './accounts.js';
import './navigation.js';
import './updates.js';
import './projects.js';


/*function getID () {
    
    let lastProject = Projects.find({}, {sort: {id: -1}, limit: 1}).fetch()[0];
            
    if (lastProject == undefined) {return 1}
        else {return (parseInt(lastProject.id) + 1)};
};*/

Template.body.onCreated(function bodyOnCreated() {
 
  Meteor.subscribe('userRole');

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





