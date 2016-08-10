import {Meteor} from 'meteor/meteor';
import {Projects, Updates} from  '../imports/api/projects.js';

function getID () {
    
    let lastProject = Projects.find({}, {sort: {id: -1}, limit: 1}).fetch()[0];
            
    if (lastProject == undefined) {return 1}
        else {return (parseInt(lastProject.id) + 1)};
}

Meteor.startup(() => {
 
  
});

Accounts.onCreateUser(
    
    function(options, user) {

         user.tenantId = options.tenantId;
         user.isAdmin = options.isAdmin;
         user.profile = options.profile;
         return user;
});

Meteor.methods({
            
    'addProject' : function (name) {
        
        if (!this.userId || !Meteor.user().isAdmin) {
            throw new Meteor.Error('not-authorized');
         } 
        
        Projects.insert({
            id: getID(),
            tenantId: 1,
            name: name
        });
        return true;
    },
    
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
        return true;
    },
    
    'removeProject': function (id) {
        
         if (!this.userId || !Meteor.user().isAdmin) {
            throw new Meteor.Error('not-authorized');
         } 
        
         Projects.remove({id: id});
         return true;
    },
    
    'removeUpdates': function (projectId) {
        
         if (!this.userId || !Meteor.user().isAdmin) {
            throw new Meteor.Error('not-authorized');
         } 
        
         Updates.remove({project_id: projectId});
         return true;
    },
    
    'getUpdatedBy': function (id) {
        
                        
         let profile = Meteor.users.findOne({_id: {$eq: id.toString()}}).profile;
                
         return (profile.firstName + ' ' + profile.lastName);
    }
});

Meteor.publish('userRole', function() {
    
         const selector = {_id: {$eq: this.userId}};
         const options = {fields: {isAdmin: 1}};
    
         return Meteor.users.find(selector, options);
});

Meteor.publish('projects', function() {
    
         const selector = {tenantId: {$eq: 1}};
        
         return Projects.find(selector);
})

Meteor.publish('updates', function() {
    
         const selector = {};
        
         return Updates.find(selector);
})