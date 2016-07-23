import { Template } from 'meteor/templating';
import { Projects } from '../api/projects.js';
import { Updates } from '../api/projects.js';
 
import './body.html';

Template.body.helpers({

    projects () {
           return Projects.find({});},
    
    updates () {
           return Updates.find({});},
    
    lastUpdate (project) {
          let id = project.id.toString();
          let update = Updates.find({project_id: { $eq: id}}, {sort: {createdAt: -1}, limit: 1});
          return Updates.find({project_id: { $eq: id}}, {sort: {createdAt: -1}, limit: 1});}, 
});

Template.project_item.helpers({      

    formatDate (date) {
         return moment(date).format('LL');},

    colorCycle (update) {
        let color = "";
        let priority = update.priority.toString();
        switch (priority) {
            case "1": color = "red";
                break;
            case "2": color = "yellow";
                break;
            case "3": color = "green";
                break;};
        //console.log(color);
        return color;}

});

Template.body.events({

    'click .new_update'(event) {

        event.preventDefault();
        var projectsList = document.getElementById("update_project");
        var priorityList = document.getElementById("update_priority");
  
        Updates.insert({
            createdAt: new Date(),
            text: document.getElementById("update_text").value,
            project_id: projectsList.options[projectsList.selectedIndex].value,
            priority: priorityList.options[priorityList.selectedIndex].value });},

});

