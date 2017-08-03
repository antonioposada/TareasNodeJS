/**
 * Created by posada on 02/08/2017.
 */
var tareas = require('express').Router();
Tarea = require('../models/Tarea.js');

//Listar Tareas
tareas.get('/',function(req,res){
    //TODO Obtener todos los documentos
    Tarea.find(function(err,list){
        if (err){
            return res.send('500: Internal Server error',500);
        }
        return res.render('tareas/list',{tareas:list});
    })
});

//formulario para crear tarea
tareas.get('/edit/new',function(req,res){
    return res.render('tareas/new',{ flash: 'Created.'});
});

//Crear Tarea
tareas.post('/edit/new',function(req,res){
    var tarea = new Tarea({
        title: req.body['title'],
        description: req.body['description'],
        status: req.body['status'],
        tags: req.body['tags']
    });

    /* Crear documento */
    console.log(tarea);
    tarea.save(function(err, tarea){
        if(err) {
            console.log(err);
            return res.send('500: Internal Server Error', 500);
        }
        return res.render('tareas/edit', {tarea: tarea,flash: 'Created.'});
    });
});

tareas.get('/edit/:id',function(req,res){
    //TODO Obtener documento por id
    var id = req.params.id;  console.log('find id:'+id);
    Tarea.findOne({_id: id}, function(err, tarea){
        if(err) {
            return res.send('500: Internal Server Error', 500);
        }
        if(!tarea) {
            return res.end('No such tarea');
        }
        return res.render('tareas/edit', {
            tarea: tarea
        });
    });
});

//Editar Tarea
tareas.put('/edit/:id',function(req,res){
    var tareaUpdate = {
        'title': req.body['title'],
        'description': req.body['description'],
        'status': req.body['status'],
        'tags': req.body['tags']
    };

    //Editar documento
    var id = req.params.id;
    if (id){
        Tarea.updateOne({_id: id},tareaUpdate, function(err, tarea){
            if(err) {
                return res.json('500: Internal Server Error', 500);
            }
            if(!tarea) {
                return res.json(404,'No such tarea');
            }
            return res.json({message: 'Updated'});
        });
    }
});

//Borrar tarea
tareas.delete('/edit/:id',function(req,res){
    id = req.params.id;
    console.log('find id:'+id);
    Tarea.deleteOne({_id: id}, function(err, tarea){
        if(req.accepts('json')) {
            if(err) {
                return res.json(500, {
                    message: 'Error delete item.',
                    error: err
                });
            }
            return res.json({
                message: 'deleted',
                _id: tarea._id
            });
        } else {
            if (err) {
                return res.send('500: Internal Server Error', 500);
            }
        }
    });
});

module.exports = tareas;