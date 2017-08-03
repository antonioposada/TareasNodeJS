/**
 * Created by posada on 02/08/2017.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    mongoose.connect('mongodb://localhost/tareas', { useMongoClient: true });

/**
 * Getters
 */
var getTags = function (tags){
  return tags.join(',');
};


/**
 * Setters
 */
var setTags = function (tags){
    return tags.split(',');
};

var TareaSchema = new Schema({
    title: String,
    description:{type: String, default:'',trim:true},
    status:{type:String,enum:['Todo','Doing','Review','Done']},
    tags:{type:[],get:getTags,set:setTags},
    createdAt:{type:Date,default:Date.now}
})

module.exports = mongoose.model('Tarea',TareaSchema);