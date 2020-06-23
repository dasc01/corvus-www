$( document ).ready(function(){
    $(document).on('click','#jtup',function(){genTable();});
});
$( document ).ready(function() {
    genTable();
});
function genTable(){
    $('.jrow').remove();
    $('#jtload').show();
    var myCmd="/usr/bin/whoami "; 
    $.newt_ajax({type: "POST",
		 url: "/command/cori",
		 data: {"executable": myCmd},    
		 success: function(ress){
		     console.log(ress);
		     var username=ress.output;
		     var corwork="/global/cscratch1/sd/"+username+"/Corvus-Work";
		     var myCmd="/usr/bin/squeue -u "+username;
		     $.newt_ajax({type: "GET",
				  url: "https://newt.nersc.gov/newt/queue/cori?&user="+username ,
				  //data: {"executable": myCmd},    
				  success: function(ress){
				      console.log(ress);
				      $('#jtload').hide();
				      for(var i=0;i<ress.length;i++){
					  job=ress[i];
					  $('#qlist').append("<tr class='jrow'><td>"+job.jobid+"</td><td>"+job.hostname+"</td><td>"+job.repo+"</td><td>"+job.qos+"</td><td>"+job.name+"</td><td>"+job.status+"</td><td>"+job.nodes+"</td></tr>");
				      }
				  },
				  error: function(errs){
				      console.log(errs);
				  },  
				 });

		 },
		 error: function(errs){
		     console.log(errs);
		 }  
		});
}
