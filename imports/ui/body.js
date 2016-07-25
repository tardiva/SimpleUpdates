import { Template } from 'meteor/templating';
import { Projects } from '../api/projects.js';
import { Updates } from '../api/projects.js';
 
import './body.html';


    class Dropdown {

        constructor (el) {

            this.dd = el;
            this.btn = el.getElementsByClassName('button-dd').item(0);
            this.menu = el.getElementsByClassName('menu-dd').item(0);
            //this.opt = ;
        }
};

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

Template.projectItem.helpers({      

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
        return color;}

});

    Template.body.events({

        'click .button-dd' (event) {     

        /*let dd = event.target,
            menu = dd.parentElement.getElementsByClassName('menu_dd').item(0);

        menu.classList.toggle('active');*/

        let dropdown = new Dropdown(event.target.parentElement);
        dropdown.menu.classList.toggle('active');
        },

        'mouseout .menu-dd' (event) {
            
            let menu = event.currentTarget;

            menu.classList.toggle('active');

            console.log('mouseout menu - ' + menu);

        },
        
        'mouseover .menu-opt, mouseout .menu-opt' (event) {
                    
            let opt = event.target;

            opt.classList.toggle('highlight');
            //event.stopPropagation();
            //console.log('menu_opt highlight - it works!');
        },

        'click .menu_opt' (event) {
            
            let opt = event.target,
                button = opt.parentElement.parentElement.getElementsByClassName('button-dd').item(0);
            button.setAttribute("value", opt.getAttribute("value"));
            button.textContent = opt.textContent;            
       },


        'click button.new-update-btn'(event) {

            event.preventDefault();

            let textField = document.getElementById("update-text"),
                projectsList = document.getElementById("update-project"),
                priorityList = document.getElementById("update-priority");
        
            Updates.insert({
                createdAt: new Date(),
                text: textField.value,
                project_id: projectsList.getAttribute("value"),
                priority: priorityList.getAttribute("value") });

            textField.value = '';
            projectsList.setAttribute("value", "0");
            projectsList.textContent = "Projects";
            priorityList.setAttribute("value", "0");
            priorityList.textContent = "Priority";
        
            console.log('update!');
        },

    });

