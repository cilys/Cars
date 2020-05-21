$(document).ready(function(){
	
	
	getDatas()
	
	
	function getDatas(){
		post(getHost() + "station/queryAll", {}, 
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
				+		"<th>地点名称</th>"
				+		"<th>X坐标</th>"
				+		"<th>Y坐标</th>"
				+		"<th>创建时间</th>"
				+		"<th>操作</th>"
				+	"</tr>"
				+ "</thead>";
		
		if(data.length > 0){
			
			s += "<tbody>";
			
			$.each(data, function(v, o) {
				s += "<tr>";
				
				s += 	"<td>" + o.id + "</td>";
				s += 	"<td>" + o.name + "</td>";
				s += 	"<td>" + o.x + "</td>"
				s += 	"<td>" + o.y + "</td>"
				
				s += "<td>" + o.createTime + "</td>";
				
				s += "<td>"
					+	"<div class='layui-btn-group'>"
					+		"<button class='layui-btn layui-btn-primary layui-btn-sm' id='btn_del' data-id='" + o.id + "'>"
					+			"<i class='layui-icon'>&#xe640;</i>"
					+		"</button>"
					+	"</div>"
					+"</td>"
				
				s += 	"</tr>";
			});
			
			s += "</tbody>"
			
			$("#t_datas").html(s)
			
			$("#t_datas #btn_del").on('click', function(){
				var id = $(this).attr("data-id");
				
				layer.confirm('是否删除该地点？(删除后将同步删除经过此站点的路线)',function(index){
		            	del(id)
		        	});
			})
		} else{
			$("#t_datas").html("<br/><span style='width:10%;height:30px;display:block;margin:0 auto;'>暂无数据</span>");
		}
				
	}
	
	function del(id){
		post(getHost() + "station/delStation?id=" + id, {
			id : id
		}, function success(res){
			layer.msg(res.msg)
			
			if(res.code == 0){
				dismissDialog()
				reloadParent()
			}
		}, function error(err){
			layer.msg("删除失败，请重试...")
		})
	}
})