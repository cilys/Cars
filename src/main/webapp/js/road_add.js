$(document).ready(function(){
	var index = 1;
	
	
	function addStationToView(){
		$("#div_add_station").append(
			"<div class='layui-form-item road_line_add_station'>"
			+ 	"<label for='input_name' class='layui-form-label'>"
			+		"<span class='x-red'>*</span>" + index + "站"
			+ 	"</label>"
			+	"<div class='layui-input-block'>"
			+		"<input type='text' data-index='" + index + "' id='input_station_" + index + "' placeholder='请输入路线名称'  name='name' autocomplete='off' class='layui-input road_line_add_station_input'>"
			+	"</div>"
			+ "</div>"
		);
		index = index + 1
	}
	
	$("#btn_station_add").on("click", function(){
		addStationToView();
	})
	
	$("#btn_station_del").on("click", function(){
		$("#div_add_station .road_line_add_station:last").remove();
		index = index - 1;
		if(index < 1){
			index = 1;
		}
	})
	
	$("#btn_add_line").on("click", function(){
		var name = $("#input_name").val();
		var color = $("#input_color").val();
		
		if(strIsEmpty(name)){
			showToast("请输入地点");
			return;
		}
		
		if(strIsEmpty(color)){
			color = "#999999"
		}
		
		
		var flag_add_station = true;
		var listData = []		
		
//		$(".road_line_add_station_input").each(function(i, obj){
//			alert("each index = " + i);
//			alert(obj);
//			
//			var jsonData = new Object();
//			jsonData.lineName = name;
//			jsonData.lineColor = color;
//			
//			var stationName = $(this).val();
//			var stationId = getStationId(stationName);
//			if(stationId == null){
//				showToast("未录入地点【" + stationName + "】");
//				flag_add_station = false;
//				return;
//			}
//			jsonData.stationId = stationId;
//			jsonData.stationIndex = $(this).attr("data-index");
//			
//			listData.push(jsonData);
//		})
		var input_stations = $(".road_line_add_station_input");
		var preStationId = -1;
		for (var i = 0; i < input_stations.length; i++) {
			var jsonData = new Object();
			jsonData.lineName = name;
			jsonData.lineColor = color;
			
			var stationName = $(input_stations[i]).val();
			var stationId = getStationId(stationName);
			if(stationId == null){
				showToast("未录入地点【" + stationName + "】");
				flag_add_station = false;
				return;
			}
			jsonData.stationId = stationId;
			jsonData.stationIndex = $(input_stations[i]).attr("data-index");
			jsonData.preStationId = preStationId;
			
			if(i < input_stations.length - 1){
				jsonData.nextStationId = getStationId($(input_stations[i + 1]).val())
			}else{
				jsonData.nextStationId = -1;
			}
			
			listData.push(jsonData);
			
			preStationId = stationId;
			
		}
		
		if(!flag_add_station){
			return;
		}
		if(listData == null || listData.length < 1){
			showToast("未添加站点")
			return;
		}
		add(listData)
	})
	
	function add(listData){
		postBody(getHost() + "line/addLine?",
		listData,
		function success(res){
			showToast(res.msg);
			if(res.code == 0){
				dismissDialog();
				reloadParent();
			}
		}, function error(err){
			logErr(err)
			showToast("添加失败，请重试")
		})
	}
	
	queryAll();
	var list_station;
	function queryAll(){
		post(getHost() + "station/queryAll", {}, 
		function success(res){
			showToast(res.msg);
			
			if(res.code == 0){
				list_station = res.data;
			}
		}, function error(err){
			logErr(err)
			showToast("获取失败，请稍后重试..")
		});
	}
	
	function getStationId(stationName){
		if(list_station != null && list_station.length > 0){
			for (var i = 0; i < list_station.length; i++) {
				if(list_station[i].name == stationName){
					return list_station[i].id;
				}
			}
		}
		return null;
	}
});