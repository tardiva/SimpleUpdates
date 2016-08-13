import {Meteor} from 'meteor/meteor';
import {Projects, Updates} from  '../imports/api/projects.js';

function getID () {
    
    let lastProject = Projects.find({}, {sort: {id: -1}, limit: 1}).fetch()[0];
            
    if (lastProject == undefined) {return 1}
        else {return (parseInt(lastProject.id) + 1)};
};

function getUsersTenant () {
        
       return Meteor.users.findOne({_id: {$eq: this.userId}}).tenantId; 
};

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
            throw new Meteor.Error('not-authorized', 'you are not authorized');
         } 
        
        try {
        Projects.insert({
            id: getID(),
            tenantId: Meteor.users.findOne({_id: {$eq: this.userId}}).tenantId,
            name: name
            });
        return true;
        }
        catch (error) {throw new Meteor.Error('not created','new record was not created')}
    },
    
    'addUpdate': function (text, project, priority){
        
         if (!this.userId) {
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
    },
    
});


Meteor.publish('userRole', function() {     
      
         if (!this.userId) {
            return this.ready();
         }
    
         const selector = {_id: {$eq: this.userId}};
         const options = {fields: {isAdmin: 1}};
    
         return Meteor.users.find(selector, options);
});

Meteor.publish('projects', function() {
    
         if (!this.userId) {
            return this.ready();
         }
    
         let usersTenant = Meteor.users.findOne({_id: {$eq: this.userId}}).tenantId;
             //Meteor.user().tenantId;
         let selector = {tenantId: {$eq: usersTenant}};
                 
         return  Projects.find(selector);
});

Meteor.publish('updates', function() { 
    
         if (!this.userId) {
            return this.ready();
         }
    
         let usersTenant = Meteor.users.findOne({_id: {$eq: this.userId}}).tenantId; 
             
         let availableProjects = Projects.find({tenantId: {$eq: usersTenant}}).map(function(project) {
             return project.id;
         });
         let selector = {project_id: {$in: availableProjects}};
        
         return Updates.find({});
});

