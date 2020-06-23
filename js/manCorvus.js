//Load the nav bar
$(function(){
    $("#navbar1").load("html/navbar.html"); 
    $("#foot1").load("html/footer.html"); 
});

$('.form-control').on('click', function(){
  $(this).toggleClass('active')
})

var user;
var workarea;
function manage_signin(){
    $.newt_ajax({
	url: 'https://newt.nersc.gov/newt/login/?next=/newt/',
	type: 'GET',
	success: function(response) {
            console.log(response.username);
	    if(response.username != null){
		$('#corvus-main').find('button, a, input').unbind('click');
		user=response.username;
		checkWorkEnvironment();
	    }
	    else{
		$('#corvus-main').find('button, a, input').click(signin_handler);
	    }
	}
    });
}
var signin_handler=function(){
    alert('Please sign in!');
    return false;
};
var waitForEl = function(selector, callback) {
    if (jQuery(selector).length) {
	callback();
    } else {
	setTimeout(function() {
	    waitForEl(selector, callback);
	}, 1000);
    }
};

function checkWorkEnvironment(){
    var cmdRoot="/project/projectdirs/m2757/www/shell/";
    var myCmd=encodeURI(cmdRoot+"manageDirectoryEnv.sh"); 
    console.log(myCmd);
    $.newt_ajax({type: "POST",
		 url: "/command/cori",
		 data: {"executable": myCmd},    
		 success: function(ress){
		     console.log(ress);
		     var info=ress.output;
		     data=info.split("\n");
		     //console.log(data[2]);
		     workarea=data[2];
		 },
		 error: function(errs){
		     console.log(errs);
		 },  
		});

}


$(document).ready(manage_signin);

$(document).on('click','#authCont :input[value="Login"]',function(){
    waitForEl('#authCont :input[value="Logout"]', manage_signin);
});
$(document).on('click','#authCont :input[value="Logout"]',function(){
    waitForEl('#authCont :input[value="Login"]', manage_signin);
});

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

$( document ).ready(function() {
    $('#calFr').on('submit',function(e){
	$('#rnCal').attr('disabled','disabled');
	$("#ldr2").show();
	e.preventDefault();
	var form=$(this);
	var info=form.serialize();
	//console.log(info);
	//var myCmd="/usr/bin/echo  "+info;      	
	var cmdRoot="/project/projectdirs/m2757/www/shell/";
	var myCmd=encodeURI(cmdRoot+"receiveInfo.sh "+info); 
	$.newt_ajax({type: "POST",
		     url: "/command/cori",
		     data: {"executable": myCmd},    
		     success: function(ress){
			 console.log(ress);
			 var cmdRoot="/project/projectdirs/m2757/www/shell/";
			 var myCmd=encodeURI(cmdRoot+"processAndRun.sh "); 
			 $.newt_ajax({type: "POST",
				      url: "/command/cori",
				      data: {"executable": myCmd},    
				      success: function(ress){
					  console.log(ress);
					  $('#rnCal').removeAttr('disabled');
					  $("#ldr2").hide();
					  alert("Job submitted to queue.");
				      },
				      error: function(errs){
					  console.log(errs);
					  $('#rnCal').removeAttr('disabled');
					  $("#ldr2").hide();
					  alert("Job submit failed.");
				      },  
				     });
		     },
		     error: function(errs){
			 console.log(errs);
		     },  
		    });

    });
});
