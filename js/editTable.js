var dir_selected=null;
$( document ).ready(function(){
    $('#rnJob').attr('disabled','disabled');
})
$( document ).ready(function() {
    var myCmd="/usr/bin/whoami "; 
    $.newt_ajax({type: "POST",
		 url: "/command/cori",
		 data: {"executable": myCmd},    
		 success: function(ress){
		     console.log(ress);
		     var username=ress.output;
		     var corwork="/global/cscratch1/sd/"+username+"/Corvus-Work";
		     console.log(corwork);
		     var myCmd="/usr/bin/ls -t "+corwork;
		     $.newt_ajax({type: "POST",
				  url: "/command/cori",
				  data: {"executable": myCmd},    
				  success: function(ress){
				      $('#editldr').hide();
				      var dirlist=ress.output.split("\n");
				      //console.log(dirlist);
				      for (var i=0;i<dirlist.length;i++){
					  $('#edittable').append("<tr>"+"<td id='eitem'> <a href='#' class='btn btn-primary'>"+dirlist[i]+"</a></td>"+"</tr>");
				      }
				  },
				  error: function(errs){
				      console.log(errs);
				  },  
				 });

		 },
		 error: function(errs){
		     console.log(errs);
		 },  
		});

    $( document ).on('click','#eitem',function(){
	$("#ldr2").show();
        var item=$(this);
        //console.log(item.text());
        dir_selected=item.text();
	console.log(dir_selected);
        var cmdRoot="/project/projectdirs/m2757/www/shell/";
        var myCmd=encodeURI(cmdRoot+"showeditSys.sh "+dir_selected); 
        $.newt_ajax({type: "POST",
                     url: "/command/cori",
                     data: {"executable": myCmd},    
                     success: function(ress){
                         console.log(ress);
			 var canvas = document.getElementById('transformBallAndStick');
			 runChemDoodle(ress.output, dir_selected);
			 $('#rnJob').removeAttr('disabled');
			 $("#ldr2").hide();
                     },
                     error: function(errs){
                         console.log(errs);
			 $('#rnJob').removeAttr('disabled');
			 $("#ldr2").hide();
                     },  
                    });
	
    });

    $('#editFr').on('submit',function(e){
	$('#rnJob').attr('disabled','disabled');
	$("#ldr2").show();
	e.preventDefault();
	var form=$(this);
	var info=form.serialize();
	var cmdRoot="/project/projectdirs/m2757/www/shell/";
	var myCmd=encodeURI(cmdRoot+"receiveInfo.sh "+info); 
	$.newt_ajax({type: "POST",
		     url: "/command/cori",
		     data: {"executable": myCmd},    
		     success: function(ress){
			 console.log(ress);
			 var cmdRoot="/project/projectdirs/m2757/www/shell/";
			 var myCmd=encodeURI(cmdRoot+"receiveInfo.sh "+"jobname: "+dir_selected); 
			 $.newt_ajax({type: "POST",
				      url: "/command/cori",
				      data: {"executable": myCmd},    
				      success: function(ress){
					  console.log(ress);
					  var cmdRoot="/project/projectdirs/m2757/www/shell/";
					  var myCmd=encodeURI(cmdRoot+"editAndRun.sh "); 
					  $.newt_ajax({type: "POST",
						       url: "/command/cori",
						       data: {"executable": myCmd},    
						       success: function(ress){
							   console.log(ress);
							   $('#rnJob').removeAttr('disabled');
							   $("#ldr2").hide();
							   alert("Job submitted to queue.");
						       },
						       error: function(errs){
							   console.log(errs);
							   $('#rnJob').removeAttr('disabled');
							   $("#ldr2").hide();
							   alert("Job submit failed.");
						       },  
						      });
				      },
				      error: function(errs){
					  console.log(errs);
				      },  
				     });
		     },
		     error: function(errs){
			 console.log(errs);
		     },  
		    });

    });

});
