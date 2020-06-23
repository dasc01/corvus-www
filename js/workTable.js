var dir_selected=null;
$( document ).ready(function(){
    $('#chemd').hide();
    $('#chart-container').remove();
    $('#tote').remove();
    $('#viewB').attr('disabled','disabled');
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
				      $('#loading').hide();
				      var dirlist=ress.output.split("\n");
				      console.log(dirlist);
				      //$('#filetable').append("<tbody>");
				      for (var i=0;i<dirlist.length;i++){
					  $('#filetable').append("<tr>"+"<td id='ditem'> <a href='#' class='btn btn-primary'>"+dirlist[i]+"</a></td>"+"</tr>");
				      //$('#filetable').append("</tbody>");
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

    $( document ).on('click','#ditem',function(){
	var item=$(this);
        //console.log(item.text());
	dir_selected=item.text();
	$('#viewB').removeAttr('disabled');
    });

    $("#vizFrm").submit(function(e){
        e.preventDefault();
        var form=$(this);
        var info=form.serialize();
	console.log(info);
	console.log(dir_selected);
        var cmdRoot="/project/projectdirs/m2757/www/shell/";
        var myCmd=encodeURI(cmdRoot+"postprocOutput.sh "+dir_selected+" "+info); 
        $.newt_ajax({type: "POST",
                     url: "/command/cori",
                     data: {"executable": myCmd},    
                     success: function(ress){
                         console.log(ress);
			 if(info.includes("ENERGY")) {
			     $('#vamsg').hide();
			     $('#chemd').hide();
			     $('#chart-container').remove();
			     $('#tote').remove()
			     $('#vizgraph').append("<span id='tote' style='font-size: 24pt ; color:darkgray ;'>Total energy <br>"+ress.output+"&nbsp a.u </span>");
			 } else if(info.includes("OPTIMIZE")){
			     $('#vamsg').hide();
			     $('#chart-container').remove();
			     $('#tote').remove();
                             $('#chemd').show();
			     runChemDoodle(ress.output, dir_selected);
			 } else if(info.includes("SPECTRA")){
			     var enexas=ress.output.split("\n");
			     console.log(enexas[0]);
			     console.log(enexas[1]);
			     $('#vamsg').hide();
                             $('#chemd').hide();
			     $('#tote').remove();
			     $('#chart-container').remove();
			     $('#vizgraph').append("<div id='chart-container'>FusionCharts XT</div>");
			     runFusionCharts(enexas[0],enexas[1]);
			 }
                     },
                     error: function(errs){
                         console.log(errs);
                     },  
                    });
    });
});
