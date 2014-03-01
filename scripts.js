/**
 * @author Harry Stevens
 */
$(document).ready(loaded);

function loaded(){
	google.load("visualization", "1", {packages:["corechart"],callback:"googleLoaded"});
}

function googleLoaded(){
	$.get("unrate.json",dataLoaded,"json");
}

function dataLoaded(unrate){
	var allData = unrate.unrateData;
	var dataArray = [];
	var dataHeaders = ["Date","Unemployment"];
	dataArray.push(dataHeaders);
	for(var i=0;i<allData.length;i++){
		var currObj = allData[i];
		var momentDate = moment(currObj.DATE);
		var currArray = [momentDate._d,currObj.VALUE];
		dataArray.push(currArray);
	}
	console.log(dataArray);
	var data = google.visualization.arrayToDataTable(dataArray);
	var options = {
          title: 'U.S. Unemployment, 1948 - Present',
          titleTextStyle: {fontSize:18},
          hAxis: {title:'Date', format: 'y', },
          vAxis:{title:'Percentage of civilians unemployed',format:'#',ticks:[0,2,4,6,8,10,12]},
          height: 600,
          curveType: 'function',
          colors:['purple'],
          explorer: { actions: ['dragToZoom', 'rightClickToReset'], keepInBounds: true, maxZoomIn: .1},
          chartArea:{top:60, height:410},
          selectionMode:'multiple',
          legend:'none'
        };        
	var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
	chart.draw(data, options);
}