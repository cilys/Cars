$(document).ready(function(){
	var startAllAppoint = 0;	//开始页数
	var currentPage = 1;	//当前页数
	var pageSize = 10
	var totalPage = 0;			//数据总条数
	
	var taskStatus = "";
	
	$("#a_logout").text("当前用户：" + getRealName())
			
	$("#a_logout").on("click", function(){
		clearCookie()
		href("./login.html");
		window.location.reload()
	})
	
	getDatas()
	
	function getDatas(){
		post(getHost() + "task/queryAll?pageNumber=" + currentPage + "&pageSize=" 
			+ pageSize + "&taskStatus" + taskStatus + "&userId=" + getUserId(),
		{
			pageNumber : currentPage
			, pageSize : pageSize
			, taskStatus : taskStatus
			, userId : getUserId()
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
				+		"<th>执行司机</th>"
				+		"<th>出发地点</th>"
				+		"<th>目的地点</th>"
				+		"<th>出行日期</th>"
				+		"<th>任务状态</th>"
				+		"<th>操作</th>"
				+	"</tr>"
				+ "</thead>";
				
			s += "<tbody>";
			$.each(data, function(v, o) {
				s += "<tr>";
				
				s += 	"<td>" + o.id + "</td>";
				s += 	"<td>" + o.carName + "</td>";
				s += 	"<td>" + o.carNum + "</td>";
				s += 	"<td>" + o.realName + "</td>";
				s += 	"<td>" + o.startStationName + "</td>";
				s += 	"<td>" + o.endStationName + "</td>";
				s += 	"<td>" + o.taskDate + "</td>";
				
				if(o.taskStatus == 2){
					s += "<td>";
					s +=		"<button id='btn_status_edit' class='layui-btn layui-btn-primary layui-btn-sm' data-status='" + o.taskStatus + "' data-carId='" + o.carId + "' data-id='" + o.id + "'>";
					s +=			"<i class='layui-icon'>&#xe63d;</i>";
					s +=		"</button>";
					s +=	 "</td>";
				} else{
					s += "<td>";
					s +=		"<button id='btn_status_edit' class='layui-btn layui-btn-primary layui-btn-sm' data-status='" + o.taskStatus + "' data-carId='" + o.carId + "' data-id='" + o.id + "'>";
					s +=			"<i class='layui-icon'>&#xe605;</i>";
					s +=		"</button>";
					s +=	 "</td>";
				}
				
				s += "<td>"
					+	"<div class='layui-btn-group'>"
					+ 		"<button class='layui-btn layui-btn-primary layui-btn-sm' id='btn_edit' data-id='" + o.id + "' data-all='" + JSON.stringify(o) + "'>"
					+			"<i class='layui-icon'>&#xe642;</i>"
					+		"</button>"
					+		"<button class='layui-btn layui-btn-primary layui-btn-sm' id='btn_del' data-id='" + o.id + "'>"
					+			"<i class='layui-icon'>&#xe640;</i>"
					+		"</button>"
					+	"</div>"
					+"</td>"
					
				s += 	"</tr>";
			});
			
			s += "</tbody>"
			$("#t_list").html(s)
			
			
			$("#t_list #btn_status_edit").on("click", function(){
				var id = $(this).attr("data-id");
				var status = $(this).attr("data-status")
				var carId = $(this).attr("data-carId");
				var taskStatus = 0;
				if(status == 2){
					taskStatus = 0;
				}else{
					taskStatus = 2;
				}
				
				layer.confirm('确认修改任务状态？',function(index){
		              updateTaskStatus(id, carId, taskStatus);
		        });
			})
			
			$("#t_list #btn_edit").on("click", function(){
				var id = $(this).attr("data-id");
				var param = $(this).attr("data-all")
				window.localStorage.setItem("taskInfo_" + id, param);
				x_admin_show('任务详情','./car_task_info.html?taskId=' + id)
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
	
	function updateTaskStatus(id, carId, taskStatus){
		post(getHost() + "task/updateTaskStatus?id=" + id + "&taskStatus=" + taskStatus + "&carId=" + carId, 
		{
			id : id
			, taskStatus : taskStatus
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
	
	function del(id){
		post(getHost() + "task/delTask?id=" + id, 
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
	
	function fomcatStatus(carStatus){
		if(carStatus == 0){
			return "空闲";
		} else if(carStatus == 2){
			return "任务";
		} 
		return carStatus;
	}
});