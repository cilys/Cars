$(document).ready(function(){
	
	
	getDatas()
	
	
	function getDatas(){
		post(getHost() + "line/queryAllLine", {}, 
		function success(res){
			showToast(res.msg);
			
			if(res.code == 0){
				setDataToView(res.data);
			}
		}, function error(err){
			logErr(err)
			showToast("获取失败，请稍后重试..")
		});
	}
	
	function setDataToView(data){
		var s = "<thead>"
				+ 	"<tr>"
				+ 		"<th>id</th>"
				+		"<th>路线名称</th>"
				+		"<th>颜色标识</th>"
				+		"<th>创建时间</th>"
				+		"<th>操作</th>"
				+	"</tr>"
				+ "</thead>";
		
		if(data.length > 0){
			
			s += "<tbody>";
			
			for (var i = 0; i < data.length; i++) {
				var o = data[i];
				
				console.log(o)
				
				s += "<tr>";
				s += 	"<td>" + o[0].lineName + "</td>";
				s += 	"<td>" + o[0].lineColor + "</td>"
				s += 	"<td>" + o[0].createTime + "</td>";
				
				s += "<td>"
					+	"<div class='layui-btn-group'>"
					+		"<button class='layui-btn layui-btn-primary layui-btn-sm' id='btn_edit' data-id='" + o[0].lineName + "' data-all='" + JSON.stringify(o) + "'>"
					+			"详情"
					+		"</button>"
					+		"<button class='layui-btn layui-btn-primary layui-btn-sm' id='btn_del' data-id='" + o[0].lineName + "'>"
					+			"删除"
					+		"</button>"
					+	"</div>"
					+"</td>"
				
				s += 	"</tr>";
			}
			
			s += "</tbody>"
			
			$("#t_datas").html(s)
			
			$("#t_datas #btn_del").on('click', function(){
				var id = $(this).attr("data-id");
				
				layer.confirm('是否删除该路线？',function(index){
		            del(id)
		        });
			})
			
			$("#t_datas #btn_edit").on('click', function(){
				var lineName = $(this).attr("data-id");
				var data_all = $(this).attr("data-all");
				
				window.localStorage.setItem("roadLineInfo_" + lineName, data_all);
				
				showDialog("路线详情", "./road_line_info.html?lineName=" + lineName);
			})
		} else{
			$("#t_datas").html("<br/><span style='width:10%;height:30px;display:block;margin:0 auto;'>暂无数据</span>");
		}	
	}
	
	function del(lineName){
		post(getHost() + "line/delRoadLine?lineName=" + lineName, {
			lineName : lineName
		}, function success(res){
			layer.msg(res.msg)
			
			if(res.code == 0){
				getDatas()
			}
		}, function error(err){
			layer.msg("删除失败，请重试...")
		})
	}
})