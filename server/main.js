import {Meteor} from 'meteor/meteor';
//import  '../imports/api/projects.js';
import {Projects, Updates} from  '../imports/api/projects.js';


Meteor.startup(() => {
 
  
});

Meteor.methods({
    
    'removeProject': function (id) {
         Projects.remove({id: id});
        
    },
    
    'removeUpdates': function (projectId) {
         Updates.remove({project_id: projectId});
    },
        
});