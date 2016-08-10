import {Meteor} from 'meteor/meteor';
//import  '../imports/api/projects.js';
import {Projects, Updates} from  '../imports/api/projects.js';


Meteor.startup(() => {
 
  
});

var Future = Npm.require('fibers/future');

Meteor.methods({
    
    'addUpdate': function (text, project, priority){
        
         if (! this.userId) {
            throw new Meteor.Error('not-authorized');
         } 
        
         Updates.insert({
            createdBy: this.userId,
            createdAt: new Date(),
            text: text,
            project_id: project,
            priority: priority            
        });
    },
    
    'removeProject': function (id) {
         Projects.remove({id: id});
        
    },
    
    'removeUpdates': function (projectId) {
         Updates.remove({project_id: projectId});
    },
    
    'getUpdatedBy': function (id) {
        
                        
        let profile = Meteor.users.findOne({_id: {$eq: id.toString()}}).profile;
                
        return (profile.firstName + ' ' + profile.lastName);
            
    }
    /*'getUserRole': function () {
         
    //Meteor.users.findOne(_id: {$eq: this.userId}, fields: {isAdmin: 1});
    //return Meteor.user().isAdmin;
        return true;
    }*/
        
});

Accounts.onCreateUser(function(options, user) {

    user.isAdmin = options.isAdmin;
    user.profile = options.profile;
    return user;
});

Meteor.publish('userRole', function() {
    
    const selector = {
        _id: {$eq: this.userId}
    };
    
    const options = {
        fields: {isAdmin: 1}
    };
    
    return Meteor.users.find(selector, options);
})