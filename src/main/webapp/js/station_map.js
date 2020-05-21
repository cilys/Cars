$(document).ready(function(){
	
	var canvas = document.getElementById("canvas_map")
	var ctx = canvas.getContext("2d");
	
//	var station = new Object();
//	station.x = 100
//	station.y = 100
//	station.name = "南京站"
//	
//	drawStation(station)
	
	queryAll();
	
	function queryAll(){
		post(getHost() + "station/queryAll", {}, 
		function success(res){
			showToast(res.msg);
			
			if(res.code == 0){
				if(res.data.length > 0){
					$.each(res.data, function(v, o) {
						drawStation(o);
					});
				}
			}
		}, function error(err){
			logErr(err)
			showToast("获取失败，请稍后重试..")
		});
	}
		
	
	function drawStation(station){
		drawCircle(station.x, station.y, 5)
		drawText(station.name, station.x, station.y)
	}
	
	function drawText(text, x, y){
		ctx.fillStyle = "#000000"
		ctx.strokeStyle = "#000000"
		ctx.beginPath();
		ctx.font = "10px Georgia"
		
		ctx.fillText(text, x + 10, y + 3, 100)
		ctx.closePath();
	}
	
	function drawLine(startX, startY, endX, endY, lineColor){
		ctx.strokeStyle = lineColor
		ctx.beginPath();
		ctx.moveTo(startX, startY);
		ctx.lineTo(endX, endY);
		
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}
	
	function drawCircle(centerX, centerY, radius){
		ctx.fillStyle = "#000000"
		ctx.strokeStyle = "#000000"
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
		
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}
	
	function drawRoadLine(data){
		for(var i = 0; i < data.length; i++){
			if(i == 0){
				
			}else{
				drawLine(data[i - 1].stationX, data[i - 1].stationY, data[i].stationX, data[i].stationY, data[i].lineColor);
			}
		}
	}
	
	queryRoadLine();
	function queryRoadLine(){
		post(getHost() + "line/queryAllLine", {}, 
		function success(res){
			showToast(res.msg);
			
			if(res.code == 0){
				if(res.data.length > 0){
					for(var i = 0; i < res.data.length; i++){
						drawRoadLine(res.data[i]);
					}
					
				}
			}
		}, function error(err){
			logErr(err)
			showToast("获取失败，请稍后重试..")
		});
	}
	
})