import { Template } from 'meteor/templating';
import { Projects, Updates } from '../api/projects.js';

import './projects.html';

Template.projects_templ.events({
                   
    'submit form.add-project' (event) {
        
        event.preventDefault();
                        
        Projects.insert({
            id: getID(),
            name: document.getElementById("add-project-name").value
        });
    },
        
    'click .delete-btn' (event) {
            
        let id = this.project.id;
        Meteor.call('removeUpdates', id);
        Meteor.call('removeProject', id);
    },

});
