import { Template } from 'meteor/templating';

import './accounts.html';

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
    user.isAdmin = user.isAdmin;
        
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
    isAdmin: isAdmin    
    });
  }
});

Template.login.events({
    
  'submit form' (event) {
      
    event.preventDefault();
    let email = event.target.loginEmail.value;
    let password = event.target.loginPassword.value;
    Meteor.loginWithPassword(email, password);
  }
});

Template.settings.events({
    
    'click .logout' (event) {
        
      event.preventDefault();
      Meteor.logout();
    }
  });


/*if(Meteor.isClient){
    
    Meteor.methods({
        
       'getUserRole': function() {
        console.log('its a stub');
        }
    });
}*/