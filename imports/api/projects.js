import { Mongo } from 'meteor/mongo';

export {Projects, Updates};

const Tenants = new Mongo.Collection("tenants");
const Projects = new Mongo.Collection("projects");
const Updates = new Mongo.Collection("updates");