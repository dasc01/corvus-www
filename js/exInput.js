$(document).ready(function(){

   $.ajax({
        method:'GET',
        url:'https://newt.nersc.gov/newt/login/?next=/newt/',
        dataType:'json'
       }).done(function(data){
        console.log(data);
        $.map(data, function(post, i){
        });
       });
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
      e.preventDefault();
      console.log("Here");
      var fileSelect = document.getElementById('id_file');
      console.log(fileSelect.files.length);
      var myFile=fileSelect.files[0];
  //    console.log(myFile.name);
      var formData=new FormData();
      formData.append('myfile', myFile, myFile.name);
      var myCmd="/bin/cat  "+myFile.name;

    $.newt_ajax({type: "POST",
              url: $(this).attr('action') ,
              enctype: $(this).attr('enctype'),
              processData: false,
              contentType: false,
             data: formData ,    
            success: function(res){
              console.log("success!!!")
        // res is { output: "output string", error: "error string", }
              console.log(res);
          },
           error: function(err){
            console.log("error!!!")
                  console.log(err);
                  $.newt_ajax({type: "POST",
            url: "/command/cori",
            data: {"executable": myCmd},    
            success: function(ress){
                // res is { output: "output string", error: "error string", }
                console.log('Succc');
                console.log(ress);
                myDisplayFile=ress.output;
              crys = ChemDoodle.readCIF(myDisplayFile,3,3,3);
              transformBallAndStick.loadContent([crys.molecule],[crys.unitCell]);
              // ChemDoodle.io.file.content('/ChemDoodleWeb/data/molecules/graphite.cif', function(fileContent){
              //   crys = ChemDoodle.readCIF(fileContent,3,3,3);
              //   console.log(crys);
              //   transformBallAndStick.loadContent([crys.molecule],[crys.unitCell]);
              // });
              },
            error: function(errs){
                // res is { output: "output string", error: "error string", }
                console.log(errs);
              },  
          });
            },
    });    

    }); 
}); 