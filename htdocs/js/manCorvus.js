//Load the nav bar
$(function(){
      $("#navbar1").load("html/navbar.html"); 
});

// $(document).ready(function(){

//    $.ajax({
//         method:'GET',
//         url:'https://newt.nersc.gov/newt/login/?next=/newt/',
//         dataType:'json'
//        }).done(function(data){
//         console.log(data);
//         $.map(data, function(post, i){
//         });
//        });
//       });





$( document ).ready(function() {
$('#loadQueue').on('click',function(){
  loadQueue();
  });
$('#contact').on('click',function(){
  alert('You asked to contact us');
  });
if($('#table_id').length != 0) {
  $('#table_id').DataTable();
}
});


// window.$ = window.jquery = require('./node_modules/jquery');
// window.dt = require('./node_modules/datatables.net')();
// window.$('#table_id').DataTable();
