$(document).ready(function(){
	if(checkHtml()){
		return;
	}
	
	var startAllAppoint = 0;	//开始页数
	var currentPage = 1;	//当前页数
	var pageSize = 10
	var totalPage = 0;			//数据总条数
	
	var carStatus = "";
	
	getDatas()
	
	function getDatas(){
		post(getHost() + "car/queryAll", 
		{
			pageNumber : currentPage
			, pageSize : pageSize
			, carStatus : carStatus
		}
		, function success(res){
			showToast(res.msg)
			
			if(res.code == 0){
				setDataToView(res.data.list)
				totalPage = res.data.totalPage;
				currentPage = res.data.pageNumber;
				toPage();
			}
			
		}, function error(err){
			showToast("获取列表失败，请刷新重试..")
		}
		)
	}
	
	function setDataToView(data){
		if(data.length > 0){
			var s = "<thead>"
				+ 	"<tr>"
				+ 		"<th>id</th>"
				+		"<th>车辆名称</th>"
				+ 		"<th>车辆编号</th>"
				+		"<th>登记时间</th>"
				+		"<th>车辆状态</th>"
				+		"<th>操作</th>"
				+	"</tr>"
				+ "</thead>";
				
			s += "<tbody>";
			$.each(data, function(v, o) {
				s += "<tr>";
				
				s += 	"<td>" + o.id + "</td>";
				s += 	"<td>" + o.carName + "</td>";
				s += 	"<td>" + o.carNum + "</td>";
				s += 	"<td>" + o.carSignTime + "</td>";
				
				s += 	"<td>" + fomcatCarStatus(o.carStatus) + "</td>";
				s += "<td>"
					+	"<div class='layui-btn-group'>"
					+ 		"<button class='layui-btn layui-btn-primary layui-btn-sm' id='btn_edit' data-id='" + o.id + "' data-all='" + JSON.stringify(o) + "'>"
					+			"编辑信息"
					+		"</button>"
					+ 		"<button class='layui-btn layui-btn-primary layui-btn-sm' id='btn_task' data-id='" + o.id + "' data-all='" + JSON.stringify(o) + "'>"
					+			"执行任务"
					+		"</button>"
					+		"<button class='layui-btn layui-btn-primary layui-btn-sm' id='btn_del' data-id='" + o.id + "'>"
					+			"删除车辆"
					+		"</button>"
					+	"</div>"
					+"</td>"
					
//				if(o.carStatus == 0){
//					s += "<td>"
//					+	"<div class='layui-btn-group'>"
//					+ 		"<button class='layui-btn layui-btn-primary layui-btn-sm' id='btn_edit' data-id='" + o.id + "' data-all='" + JSON.stringify(o) + "'>"
//					+			"编辑信息"
//					+		"</button>"
//					+ 		"<button class='layui-btn layui-btn-primary layui-btn-sm' id='btn_task' data-id='" + o.id + "' data-all='" + JSON.stringify(o) + "'>"
//					+			"执行任务"
//					+		"</button>"
//					+		"<button class='layui-btn layui-btn-primary layui-btn-sm' id='btn_del' data-id='" + o.id + "'>"
//					+			"删除车辆"
//					+		"</button>"
//					+	"</div>"
//					+"</td>"
//				}else if(o.carStatus == 1){
//					s += "<td>"
//					+	"<div class='layui-btn-group'>"
//					+ 		"<button disabled='disabled' class='layui-btn layui-btn-primary layui-btn-disabled layui-btn-sm' id='btn_edit' data-id='" + o.id + "' data-all='" + JSON.stringify(o) + "'>"
//					+			"编辑信息"
//					+		"</button>"
//					+ 		"<button disabled='disabled' class='layui-btn layui-btn-primary layui-btn-disabled layui-btn-sm' id='btn_task' data-id='" + o.id + "' data-all='" + JSON.stringify(o) + "'>"
//					+			"执行任务"
//					+		"</button>"
//					+		"<button class='layui-btn layui-btn-primary layui-btn-sm' id='btn_del' data-id='" + o.id + "'>"
//					+			"删除车辆"
//					+		"</button>"
//					+	"</div>"
//					+"</td>"
//				} else if(o.carStatus == 2){
//					s += "<td>"
//					+	"<div class='layui-btn-group'>"
//					+ 		"<button disabled='disabled' class='layui-btn layui-btn-primary layui-btn-disabled layui-btn-sm' id='btn_edit' data-id='" + o.id + "' data-all='" + JSON.stringify(o) + "'>"
//					+			"编辑信息"
//					+		"</button>"
//					+ 		"<button disabled='disabled' class='layui-btn layui-btn-primary layui-btn-disabled layui-btn-sm' id='btn_task_info' data-id='" + o.id + "' data-all='" + JSON.stringify(o) + "'>"
//					+			"查看任务"
//					+		"</button>"
//					+		"<button disabled='disabled' class='layui-btn layui-btn-primary layui-btn-disabled layui-btn-sm' id='btn_del' data-id='" + o.id + "'>"
//					+			"删除车辆"
//					+		"</button>"
//					+	"</div>"
//					+"</td>"
//				}
					
					
				s += 	"</tr>";
			});
			
			s += "</tbody>"
			$("#t_list").html(s)
			
			
			$("#t_list #btn_edit").on("click", function(){
				var id = $(this).attr("data-id");
				var param = $(this).attr("data-all")
				x_admin_show('编辑信息','./car_edit.html?carId=' + id + "&param=" + encodeURIComponent(param))
			})
			
			$("#t_list #btn_task").on("click", function(){
				var id = $(this).attr("data-id");
				var param = $(this).attr("data-all")
				var jsonData = JSON.parse(param);
				x_admin_show('执行任务','./car_task_add.html?carNum=' + jsonData.carNum 
					+ "&carName=" + jsonData.carName + "&carId=" + jsonData.id)
			})
			
			$("#t_list #btn_task_info").on("click", function(){
				var id = $(this).attr("data-id");
				var param = $(this).attr("data-all")
				x_admin_show('任务详情','./car_edit.html?carId=' + id + "&param=" + encodeURIComponent(param))
			})
			
			$("#t_list #btn_del").on("click", function(){
				var id = $(this).attr("data-id")
				layer.confirm('确认删除？',function(index){
		              del(id);
		        });
			})
		} else {
			$("#t_list").html("<br/><span style='width:10%;height:30px;display:block;margin:0 auto;'>暂无数据</span>");
			$("#paged").hide()
		}
	}
	
	function toPage(){
   		layui.use('laypage', function(){
   			var laypage = layui.laypage;
   			
   			laypage.render({
	   			elem : 'paged'
	   			, count : totalPage
	   			, limit : pageSize
	   			, curr : currentPage
	   			, jump : function(obj, first){
	   				currentPage = obj.curr;
	   				
	   				if(!first){
	   					getDatas()
	   				}
	   			}
	   		});
   		});
	};
	
	function del(id){
		post(getHost() + "car/delCar", 
		{
			id : id
		}, function success(res){
			showToast(res.msg)
			
			if(res.code == 0){
				getDatas()
			}
		}, function error(err){
			showToast("删除失败，请重试..")
		}
		)
	}
	
	function fomcatCarStatus(carStatus){
		if(carStatus == 0){
			return "空闲中";
		} else if(carStatus == 1){
			return "已报废";
		} else if(carStatus == 2){
			return "任务中";
		} 
		return carStatus;
	}
});