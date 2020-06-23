function runFusionCharts(arg1, arg2) {
    var ene=arg1;
    var xas=arg2;
    FusionCharts.ready(function() {
	var myChart = new FusionCharts({
	    type: "zoomline",
	    renderAt: "chart-container",
	    width: "100%",
	    height: "100%",
	    dataFormat: "json",
	    dataSource: {
		"chart": {
		    "caption": "Calculated Spectrum",
		    "subcaption": "Click & drag on the plot area to zoom & then scroll",
		    "yaxisname": "Intensity",
		    "xaxisname": "Energy (eV)",
		    "forceaxislimits": "1",
		    "pixelsperpoint": "0",
		    "pixelsperlabel": "30",
		    "compactdatamode": "1",
		    "dataseparator": "|",
		    "theme": "fusion"
		},
		"categories": [
		    {
			"category": ene
		    }
		],
		"dataset": [
		    {
		//	"seriesname": "Sold",
			"data": xas
		    },
		]
	    }
	});
	myChart.render();
    });

}


function runChemDoodle(moldata, filName){
    var crys='';
    var myDisplayFile=moldata;
    if(filName.includes('cif') || filName.includes('CIF')) {
	crys = ChemDoodle.readCIF(myDisplayFile,1,1,1);
	transformBallAndStick.loadContent([crys.molecule],[crys.unitCell]);
    } else if (filName.includes('xyz') || filName.includes('XYZ'))  {
	crys = ChemDoodle.readXYZ(myDisplayFile);
	transformBallAndStick.loadMolecule(crys);
    } else if ( filName.includes('mol') || filName.includes('MOL')) {
	crys = ChemDoodle.readMOL(myDisplayFile);
	transformBallAndStick.loadMolecule(crys);    
    }
}
