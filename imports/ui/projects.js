import { Template } from 'meteor/templating';
import { Projects, Updates } from '../api/projects.js';

import './projects.html';

/*function getID () {
    
    let lastProject = Projects.find({}, {sort: {id: -1}, limit: 1}).fetch()[0];
            
    if (lastProject == undefined) {return 1}
        else {return (parseInt(lastProject.id) + 1)};
}*/

Template.projects_templ.events({
                   
    'submit form.add-project' (event) {
        
        event.preventDefault();
        
        let name = document.getElementById("add-project-name").value;
        
        Meteor.call('addProject', name, function (error, result) {
            
            if (error) {alert(error.reason)}
                else if (result) {alert(`project ${name} has been created`)}
        });
                        
        /*Projects.insert({
            id: getID(),
            name: document.getElementById("add-project-name").value
        });*/
    },
        
    'click .delete-btn' (event) {
            
        let id = this.project.id;
        Meteor.call('removeUpdates', id);
        Meteor.call('removeProject', id);
    },

});
