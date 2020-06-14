$(document).ready(function(){
	var taskId = getUrlParam("taskId");
	var param = window.localStorage.getItem("taskInfo_" + taskId);
	window.localStorage.removeItem("taskInfo_" + taskId);
	
	var jsonData = JSON.parse(param);
	
	$("#input_name").val(jsonData.carName);
	$("#input_num").val(jsonData.carNum);
	$("#input_realName").val(jsonData.realName);
	$("#input_startStation").val(jsonData.startStationName);
	$("#input_endStation").val(jsonData.endStationName);
	$("#input_task_date").val(jsonData.taskDate);
	var startStationId = jsonData.startStationId;
	var endStationId = jsonData.endStationId;
	var carId = jsonData.carId;
	
	var taskStatus = jsonData.taskStatus;
	$("#radio_task_" + taskStatus).attr("checked", "checked");
	
	getShortLine(startStationId, endStationId, false);
	
	function getShortLine(startStationId, endStationId, isAdd){
		post(getHost() + "line/getShortLine?startStationId=" + startStationId + "&endStationId=" + endStationId,
		{}, function success(res){
			showToast(res.msg);
			if(res.code == 0){
				if(res.data != null && res.data.length > 0){
					var preStationX = -1;
					var preStationY = -1
					$("#div_short_road_line").html("")
					var totalDistance = 0;
					for(var i = 0; i < res.data.length; i++){
						var distance = 0;
						if(i == 0){
							distance = "总" + res.data[i].totalDistance + " km";
							totalDistance = res.data[i].totalDistance;
						}else{
							dis = Math.sqrt((Math.abs(res.data[i].x - preStationX)) * (Math.abs(res.data[i].x - preStationX))
								+ (Math.abs(res.data[i].y - preStationY)) * (Math.abs(res.data[i].y - preStationY)))
							distance = Math.floor(dis)
							distance = "" + distance + " km"
						}
						
						addStationToView(distance, res.data[i].name, distance)
						
						if(i > 0){
							drawLine(res.data[i - 1].x, res.data[i - 1].y, 
								res.data[i].x, res.data[i].y, "#FF0000");
						}
						
						preStationX = res.data[i].x;
						preStationY = res.data[i].y;
					}
					if(isAdd){
//						getTaskInputData(totalDistance);
					}
				}else{
					$("#div_short_road_line").html("")
					addStationToView("", "获取路线失败，请确认是否存在该路线")
				}
			}
		}, function error(err){
			showToast("获取路线失败，请确认是否存在该路线？")
			$("#div_short_road_line").html("")
			addStationToView("", "获取路线失败，请确认是否存在该路线")
		})
	}
	
	function addStationToView(distance, stationName){
		$("#div_short_road_line").append(
			"<div class='layui-form-item road_line_add_station'>"
			+ 	"<label for='input_name' class='layui-form-label' title='" + distance + "'>"
			+		"<span class='x-red'></span>" + distance + ""
			+ 	"</label>"
			+	"<div class='layui-input-block'>"
			+		"<input type='text' disabled='disabled' value='" + stationName + "' placeholder='请输入路线名称'  name='name' autocomplete='off' class='layui-input road_line_add_station_input'>"
			+	"</div>"
			+ "</div>"
		);
	}
	
	$("#btn_add").on("click", function(){
		var taskStatus = $("input[name='taskStatus']:checked").val()
		updateTaskStatus(taskId, carId, taskStatus)
	})
	
	function updateTaskStatus(id, carId, taskStatus){
		post(getHost() + "task/updateTaskStatus?id=" + id + "&taskStatus=" + taskStatus + "&carId=" + carId, 
		{
			id : id
			, carId : carId
			, taskStatus : taskStatus
		}, function success(res){
			showToast(res.msg)
			
			if(res.code == 0){
				dismissDialog()
				reloadParent()
			}
		}, function error(err){
			showToast("删除失败，请重试..")
		}
		)
	}
	
	
	
	function renderSelect(){
		layui.use('form', function(){
			var form = layui.form;
			form.render();
		})
	}
	
	layui.use('laydate', function(){
	  var laydate = layui.laydate;
	  
	  //常规用法
	  laydate.render({
	    elem: '#input_task_date'
	  });
	});
	
	var canvas = document.getElementById("canvas_map")
	var ctx = canvas.getContext("2d");
	
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