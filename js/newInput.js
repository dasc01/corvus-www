$(document).ready(function(){
$('#rnCal').attr('disabled','disabled');
});


var myDisplayFile='';
var transformBallAndStick = new ChemDoodle.TransformCanvas3D('transformBallAndStick', 500, 500);
transformBallAndStick.specs.set3DRepresentation('Ball and Stick');
transformBallAndStick.specs.backgroundColor = 'black';
transformBallAndStick.specs.shapes_color='white';
transformBallAndStick.specs.compass_display=true;
//ChemDoodle.default_shapes_color='#ffffff';
var crys='';

$( document ).ready(function() {
    console.log( "ready!" );
    $("#myUpload").submit(function(e){
	$("#ldr2").show();
	e.preventDefault();
	var fileSelect = document.getElementById('id_file');
	console.log(fileSelect.files.length);
	var myFile=fileSelect.files[0];
	var formData=new FormData();
	formData.append('myfile', myFile, myFile.name);
	console.log("yooo "+user+" "+workarea);
	$.newt_ajax({type: "POST",
		     //url: "https://newt.nersc.gov/newt/file/cori/global/homes/p/pemmaraj/" ,
		     url: "https://newt.nersc.gov/newt/file/cori"+workarea ,
		     enctype: $(this).attr('enctype'),
		     processData: false,
		     contentType: false,
		     data: formData ,    
		     success: function(res){
			 console.log("success!!!")
			 console.log(res);
		     },
		     error: function(err){
			 console.log("error!!!")
			 console.log(err);
			 var cmdRoot="/project/projectdirs/m2757/www/shell/";
			 var myCmd=encodeURI(cmdRoot+"createNewSystem.sh "+myFile.name); 
			 $.newt_ajax({type: "POST",
				      url: "/command/cori",
				      data: {"executable": myCmd},    
				      success: function(ress){
					  console.log(ress);
					  var myCmd=encodeURI(cmdRoot+"catStructureFile.sh "); 
					  //var myCmd="/bin/cat  "+myFile.name;      
					  $.newt_ajax({type: "POST",
						       url: "/command/cori",
						       data: {"executable": myCmd},    
						       success: function(ress){
							   console.log('Succc');
							   console.log(ress);
							   myDisplayFile=ress.output;
							   if(myFile.name.includes('cif') || myFile.name.includes('CIF')) {
							       crys = ChemDoodle.readCIF(myDisplayFile,1,1,1);
							       transformBallAndStick.loadContent([crys.molecule],[crys.unitCell]);
							   } else if (myFile.name.includes('xyz') || myFile.name.includes('XYZ'))  {
							       crys = ChemDoodle.readXYZ(myDisplayFile);
							       transformBallAndStick.loadMolecule(crys);
							   } else if ( myFile.name.includes('mol') || myFile.name.includes('MOL')) {
							       crys = ChemDoodle.readMOL(myDisplayFile);
							       transformBallAndStick.loadMolecule(crys);    
							   }
							   $("#ldr2").hide();
							   $('#rnCal').removeAttr('disabled');
						       },
						       error: function(errs){
							   console.log(errs);
							   $("#ldr2").hide();
							   $('#rnCal').removeAttr('disabled');
						       },  
						      });

				      },
				      error: function(errs){
					  console.log(errs);
				      },  
				     });
		     },
		    });    
	
    }); 
}); 
