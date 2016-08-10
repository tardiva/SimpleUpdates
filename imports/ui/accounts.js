import { Template } from 'meteor/templating';

import './accounts.html';

Accounts.onLogin(function() {
  var path = FlowRouter.current().path;
  if(path === "/"){
    FlowRouter.go("/home");
  }
});

Template.registerHelper(
    
    'hasUsers',()  =>{
    
    if (Meteor.users.find({}).count() > 0) {return true}
        else {return false};
    }
);

Template.registerHelper(
    
    'getUserInfo',()  =>{
    
    let user = Meteor.user();
    user.email = user.emails[0].address;
    user.firstName = user.profile.firstName;
    user.lastName = user.profile.lastName;     
    user.isAdmin = user.isAdmin;
    user.fullName = user.firstName + ' ' + user.lastName;
        
    return user;
    }
);

Template.registerHelper(
    
    'isAdmin', () => {
    
        /*Meteor.call('getUserRole', function(error, result) {
        if(error){
            console.log(error);
        } else {
           //return result;
            console.log(result);
        }*/
        
       let result = Meteor.call('getUserRole');
       console.log(result);
        //return result;
    }
); 
 
Template.signup.events({
    
  'submit form' (event) {
      
    event.preventDefault();
            
    let email = event.target.signupEmail.value,
        password = event.target.signupPassword.value,
        tenantId = 1,
        isAdmin = event.target.isAdmin.checked,
        firstName = event.target.firstName.value,
        lastName = event.target.lastName.value;
      
    console.log(isAdmin);
      
    Accounts.createUser({
    email: email,
    password: password,
    profile: {
        firstName: firstName,
        lastName: lastName
    },   
    isAdmin: isAdmin,
    tenantId: tenantId    
    });
  }
});

Template.login.events({
    
  'submit form' (event) {
      
    event.preventDefault();
    let email = event.target.loginEmail.value;
    let password = event.target.loginPassword.value;
    Meteor.loginWithPassword(email, password);
    
  },
    
    'click #sign-up-link' (event) {
      event.preventDefault();
      FlowRouter.go("/signup");
    }
});