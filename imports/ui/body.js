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
          lastUpdate (project) {
          let id = project.id.toString();
      let update = Updates.find({project_id: { $eq: id}}, {sort: {createdAt: -1}, limit: 1});
      return Updates.find({project_id: { $eq: id}}, {sort: {createdAt: -1}, limit: 1});}, 

});

Template.update_item.helpers({

    formatDate (date) {
         var date = date = moment();
         return date = date.format('LL');}
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

