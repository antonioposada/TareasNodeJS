/**
 * Created by posada on 03/08/2017.
 */


function BorrarTarea(id){
    $.ajax({
        url: '/tareas/edit/'+id,
        type: 'DELETE',
        data: {},
        contentType:'application/json',
        dataType: 'json',
        success: function(result) {
            alert(result.message);
            $(location).attr('href','/tareas');
        },
        error: function(result){

        }
    });
}


function EditarTarea(id){
    $.ajax({
        url: '/tareas/edit/'+id,
        type: 'PUT',
        data: {
            title: $('#title').val(),
            description: $('#description').val(),
            status: $('#status').val(),
            tags: $('#tags').val(),
        },
        contentType:'application/json',
        dataType: 'json',
        success: function(result) {
            alert(result.message);
        },
        error: function(result){
            alert(result);
        }
    });
}