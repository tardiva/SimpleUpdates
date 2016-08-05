import { Mongo } from 'meteor/mongo';

export {Projects, Updates};

const Projects = new Mongo.Collection("projects");
const Updates = new Mongo.Collection("updates");