import { Mongo } from 'meteor/mongo';

export const Projects = new Mongo.Collection("projects");
export const Updates = new Mongo.Collection("updates");