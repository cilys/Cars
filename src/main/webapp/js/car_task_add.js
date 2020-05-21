$(document).ready(function(){
	var carNum = getUrlParam("carNum");
	var carName = getUrlParam("carName");
	var carId = getUrlParam("carId");
	
	$("#input_name").val(carName);
	$("#input_num").val(carNum);
	
	$("#btn_road_line").on("click", function(){
		var startStationName = $("#select_station_start").find("option:selected").text();
		var startStationId = $("#select_station_start").val()
		if (startStationId == null || startStationId == ""){
			showToast("请选择起始站点")
			return;
		}
		
		var endStationName = $("#select_station_end").find("option:selected").text();
		var endStationId = $("#select_station_end").val()
		if (endStationId == null || endStationId == ""){
			showToast("请选择目的站点")
			return;
		}
		
		if(startStationId == endStationId){
			showToast("起始站点和目的站点不能是同一个")
			return;
		}
		
		
		resetCanvas();
		getShortLine(startStationId, endStationId, false);
	})
	
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
						getTaskInputData(totalDistance);
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
		var startStationName = $("#select_station_start").find("option:selected").text();
		var startStationId = $("#select_station_start").val()
		if (startStationId == null || startStationId == ""){
			showToast("请选择起始站点")
			return;
		}
		
		var endStationName = $("#select_station_end").find("option:selected").text();
		var endStationId = $("#select_station_end").val()
		if (endStationId == null || endStationId == ""){
			showToast("请选择目的站点")
			return;
		}
		
		if(startStationId == endStationId){
			showToast("起始站点和目的站点不能是同一个")
			return;
		}
		
		getShortLine(startStationId, endStationId, true);
	})
	
	function getTaskInputData(totalDistance){
		var startStationName = $("#select_station_start").find("option:selected").text();
		var startStationId = $("#select_station_start").val()
		if (startStationId == null || startStationId == ""){
			showToast("请选择起始站点")
			return;
		}
		
		var endStationName = $("#select_station_end").find("option:selected").text();
		var endStationId = $("#select_station_end").val()
		if (endStationId == null || endStationId == ""){
			showToast("请选择目的站点")
			return;
		}
		
		if(startStationId == endStationId){
			showToast("起始站点和目的站点不能是同一个")
			return;
		}
		
		var userId = $("#select_user").val();
		var realName = $("#select_user").find("option:selected").text();
		var taskDate = $("#input_task_date").val();
		var taskStatus = 2;
		
		addTask(userId, realName, startStationId, startStationName, endStationId, endStationName,
			taskDate, taskStatus, totalDistance);
	}
	
	function addTask(userId, realName, startStationId, startStationName, endStationId,
		endStationName, taskDate, taskStatus, totalDistance){
			
		postBody(getHost() + "task/addTask", 
			{
				carNum : carNum
				, carName : carName
				, userId : userId
				, realName : realName
				, startStationId : startStationId
				, startStationName : startStationName
				, endStationId : endStationId
				, endStationName : endStationName
				, taskDate : taskDate
				, taskStatus : taskStatus
				, totalDistance : totalDistance
				, carId : carId
			}, function success(res){
				showToast(res.msg);
				if(res.code == 0){
					dismissDialog()
					reloadParent();
				}
			}, function error(err){
				logErr(err)
				showToast("分派任务失败，请重试..")
			});
	}
	
	getUsers();
	getStations();
	
	function getUsers(){
		post(getHost() + "sys/user/getUsers?pageNumber=1&pageSig10000&status=0", 
		{
			pageNumber: 1
			, pageSize : 10000
			, status : "0"
		}, function success(res){
			showToast(res.msg);
			if(res.code == 0){
				if(res.data.list.length > 0){
					var s = "";
					s += "<option value=''>请选择司机</option>"
					$.each(res.data.list, function(o, v){
						s += "<option value='" + v.userId + "'>" + v.realName + "</option>"
					});
					$("#select_user").html(s)
					renderSelect()
				}
			}
		}, function error(err){
			showToast("获取用户列表失败");
		});
	}
	
	function getStations(){
		post(getHost() + "station/queryAll", {}, 
		function success(res){
			showToast(res.msg);
			
			if(res.code == 0){
				if(res.data.length > 0){
					var s = "";
					s += "<option value=''>请选择站点</option>"
					$.each(res.data, function(o, v){
						s += "<option value='" + v.id + "'>" + v.name + "</option>"
					});
//					$("#select_station_start").html(s)
					$("#select_station_end").html(s)
					renderSelect()
				}
			}
		}, function error(err){
			logErr(err)
			showToast("获取失败，请稍后重试..")
		});
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
	
	resetCanvas()
	
	function resetCanvas(){
		ctx.clearRect(0, 0, 600, 600);
		queryAll();
		queryRoadLine();
	}
	
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