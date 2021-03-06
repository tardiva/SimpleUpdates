import { Template } from 'meteor/templating';
import { Projects, Updates, Tenants } from '../api/projects.js';

import './updates.html';

class UpdateForm {
    
    constructor() {
        //this.form = el,
        this.textField = document.getElementById("new-update-text"),
        this.projectsList = document.getElementById("new-update-project"),
        this.priorityList = document.getElementById("new-update-status")
    }
    
    submit () {
        
        let text = this.textField.value,
            project = parseInt(this.projectsList.getAttribute("value")),
            priority = this.priorityList.getAttribute("value");
        
        Meteor.call('addUpdate', text, project, priority);
    }
        
    clear () {
        
        this.textField.value = '';
        this.textField.style.height = '30px'
        this.projectsList.setAttribute("value", "0");
        this.projectsList.textContent = "Select Project";
        this.priorityList.setAttribute("value", "0");
        this.priorityList.textContent = "Status";
    }
    
    validate () {
        
        let isValid = true;
        
        if (this.priorityList.value ==='0') {
                this.priorityList.closest('.form-group').classList.add('has-error');
                isValid = false;
                }
            else {this.priorityList.closest('.form-group').classList.remove('has-error')};
        
        if (this.projectsList.value ==='0') {
                this.projectsList.closest('.form-group').classList.add('has-error');
                isValid = false;
                }
            else {this.projectsList.closest('.form-group').classList.remove('has-error')};
                                             
        if (this.textField.value === null || this.textField.value === '') {
                this.textField.closest('.form-group').classList.add('has-error');
                isValid = false;
                }
            else {this.textField.closest('.form-group').classList.remove('has-error')};
        
        return isValid;
        
    }
};


Template.updates_templ.helpers({
    
    projects () {
        return Projects.find({});
    },
    
    hasUpdates (project) {
         if (Updates.find({project_id: {$eq: project.id}}).count() < 1) {return false}
               else {return true};
    },
    
    lastUpdate (project) {
        return Updates.find({project_id: { $eq: project.id}}, {sort: {createdAt: -1}, limit: 1}).fetch()[0];
          
      }, 
    
});

Template.project_item.helpers({      

    formatDate (date) {
        if (date instanceof Date){
        return moment(date).format('Do MMMM')};},

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
        return color;
    },
        
});

Template.project_item.onRendered(
    
function() {
        
    let instance = Template.instance(),
        update = instance.data.update,
        target = instance.find('.updated-by');
            
    Meteor.call('getUpdatedBy', update.createdBy, function (error, result) {
              if (error) {
                console.log(error);
                //some error message should be shown here. or just leave the span empty
               };
              if (result) {
                target.textContent = result;
               };
        });
}   
    
);

Template.updates_templ.events({
    
    'submit form.new-update'(event) {

        event.preventDefault();
        
        let updateForm = new UpdateForm();
        
        if (updateForm.validate()){
        updateForm.submit();
        updateForm.clear();
        }
                
    },
    
    'click form.new-update .btn-cancel' (event) {
               
        let updateForm = new UpdateForm();
        
        updateForm.clear();
        
    },
    
    'click .menu-opt' (event) {
            
        let opt = event.target.closest('.menu-opt'),
            button = opt.closest('.dropdown').getElementsByClassName('dropdown-toggle').item(0);
        
        console.log(opt);
        console.log(opt.getAttribute("value"));
        
        button.innerHTML = opt.innerHTML;
        button.setAttribute("value", opt.getAttribute("value"));
    },
    
    'keyup textarea' (event) {
        
        let el = event.target;
        
        el.style.height = el.scrollHeight + 'px';
        
        console.log(el.clientHeight +' '+ el.scrollHeight);
        
    }
});
