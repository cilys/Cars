$(document).ready(function(){
	
	var lineName = getUrlParam("lineName");
	
	var param = window.localStorage.getItem("roadLineInfo_" + lineName);
	
	window.localStorage.removeItem("roadLineInfo_" + lineName);
	
	console.log(param);
	var jsonData = JSON.parse(param);
	
	$("#input_name").val(jsonData[0].lineName);
	$("#input_color").val(jsonData[0].lineColor);
	
	for (var i = 0; i < jsonData.length; i++) {
		addStationToView(jsonData[i].stationIndex, jsonData[i].stationName);
	}
	
	function addStationToView(index, stationName){
		$("#div_add_station").append(
			"<div class='layui-form-item road_line_add_station'>"
			+ 	"<label for='input_name' class='layui-form-label'>"
			+		"<span class='x-red'></span>" + index + "站"
			+ 	"</label>"
			+	"<div class='layui-input-block'>"
			+		"<input type='text' disabled='disabled' value='" + stationName + "' data-index='" + index + "' id='input_station_" + index + "' placeholder='请输入路线名称'  name='name' autocomplete='off' class='layui-input road_line_add_station_input'>"
			+	"</div>"
			+ "</div>"
		);
		index = index + 1
	}
	
	$("#btn_del").on("click", function(){
		del(jsonData[0].lineName);
	})
	
	function del(lineName){
		post(getHost() + "line/delRoadLine?lineName=" + lineName, {
			lineName : lineName
		}, function success(res){
			layer.msg(res.msg)
			
			if(res.code == 0){
				dismissDialog()
				reloadParent();
			}
		}, function error(err){
			layer.msg("删除失败，请重试...")
		})
	}
});