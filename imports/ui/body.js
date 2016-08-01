import { Template } from 'meteor/templating';
import { Projects } from '../api/projects.js';
import { Updates } from '../api/projects.js';
 
import './body.html';


class Dropdown {

    constructor (el) {

        this.dd = el;
        this.btn = el.getElementsByClassName('button-dd').item(0);
        this.menu = el.getElementsByClassName('menu-dd').item(0);
        //this.opts = ;
        }
};

function getID () {
    
    let lastProject = Projects.find({}, {sort: {id: -1}, limit: 1}).fetch()[0];
            
    if (lastProject == undefined) {return 1}
        else {return (parseInt(lastProject.id) + 1)};
};


Template.body.helpers({

    projects () {
        return Projects.find({});
    },
    
    updates () {
        return Updates.find({});
    },
    
    hasUpdates (project) {
         if (Updates.find({project_id: {$eq: project.id}}).count() < 1) {return false}
               else {return true};
    },
    
    lastUpdate (project) {
        return Updates.find({project_id: { $eq: project.id}}, {sort: {createdAt: -1}, limit: 1}).fetch()[0];
          
      }, 
    
    noUpdates () {
        update = {
          createdAt: "",
          priority: "",
          text: "no updates for this project"
        };
        return update;
    }
});

Template.projectItem.helpers({      

    formatDate (date) {
        if (date instanceof Date){
        return moment(date).format('LL')};},

    colorCycle (update) {
        let color = "";
        let priority = update.priority;
        switch (priority) {
            case "1": color = "red";
                break;
            case "2": color = "yellow";
                break;
            case "3": color = "green";
                break;};
        return color;}

});

Template.body.events({

    'mouseleave .wrapper-dd' (event) {
        
        let dropdown = new Dropdown(event.target);
        dropdown.menu.classList.remove('active');
    },
        
    'click .button-dd' (event) {     

        /*let menu = event.target.parentElement.getElementsByClassName('menu_dd').item(0);
        menu.classList.toggle('active');*/

        let dropdown = new Dropdown(event.target.parentElement);
        dropdown.menu.classList.toggle('active');
    },   
        
    'mouseover .menu-opt, mouseout .menu-opt' (event) {
        
        event.target.classList.toggle('highlight');
    },

    'click .menu-opt' (event) {
            
        let opt = event.target,
            button = opt.parentElement.parentElement.getElementsByClassName('button-dd').item(0);
        button.setAttribute("value", opt.getAttribute("value"));
        button.textContent = opt.textContent;
        opt.closest(".menu-dd").classList.remove("active");
    },


    'submit form.add-update'(event) {

        event.preventDefault();

        let textField = document.getElementById("update-text"),
            projectsList = document.getElementById("update-project"),
            priorityList = document.getElementById("update-priority");
        
        Updates.insert({
            createdAt: new Date(),
            text: textField.value,
            project_id: parseInt(projectsList.getAttribute("value")),
            priority: priorityList.getAttribute("value") });

        textField.value = '';
        projectsList.setAttribute("value", "0");
        projectsList.textContent = "Projects";
        priorityList.setAttribute("value", "0");
        priorityList.textContent = "Priority";
    },
        
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

/*Meteor.methods({
    
    'removeProject': function (id) {
        Projects.remove({id: id});
    },
    
    'removeUpdates': function (projectId) {
       Updates.remove({project_id: projectId});
    },
        
});
*/
