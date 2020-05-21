$(document).ready(function(){
	$("#btn_add").on("click", function(){
		var name = $("#input_name").val();
		var x = $("#input_x").val();
		var y = $("#input_y").val();
		
		if(strIsEmpty(name)){
			showToast("请输入地点");
			return;
		}
		
		if(strIsEmpty(x)){
			showToast("请输入X坐标");
			return;
		}
		if(x < 0 || x > 600){
			showToast("请输入合法的X坐标")
			return
		}
		
		if(strIsEmpty(y)){
			showToast("请输入Y坐标");
			return;
		}
		if(y < 0 || y > 600){
			showToast("请输入合法的Y坐标")
			return
		}
		add(name, x, y);
	})
	
	function add(name, x, y){
		post(getHost() + "station/addStation?name=" + name + "&x=" + x + "&y=" + y,
		{},
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
});