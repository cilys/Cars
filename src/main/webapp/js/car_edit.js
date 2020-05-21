$(document).ready(function(){
	var id = getUrlParam("carId")
	var param = decodeURIComponent(getUrlParam("param"))
	
	var paramJson = JSON.parse(param);
	$("#input_name").val(paramJson.carName)
	$("#input_num").val(paramJson.carNum)
	$("#input_sign").val(paramJson.carSignTime)
	
	var carStatus = paramJson.carStatus
	
////	$('input:radio[name="carStatus"]').eq(2).attr("check", 'checked');
//	$("input[@type=radio][name=carStatus][@value=1]").attr("checked",true);
	if(carStatus == 0){
		$("#radio_status_0").attr("checked", "checked");
	} else if(carStatus == 1){
		$("#radio_status_1").attr("checked", "checked");
	} else if(carStatus == 2){
		$("#radio_status_2").attr("checked", "checked");
	}
	
	
	$("#btn_add").on('click', function(){
		var name = $("#input_name").val()
		if(strIsEmpty(name)){
			showToast("请输入名称")
			return;
		}
		var num = $("#input_num").val()
		var status = $('input:radio[name="carStatus"]:checked').val();
		var carSignTime = $("#input_sign").val()
		
		update(name, status ? "0" : "1")
	});
	
	function update(name, num, carSignTime, status){
		postBody(getHost() + "car/updateCar", 
		{
			id : id
			,
			carName : name
			, carNum : num
			, carSignTime : carSignTime
			, carStatus : status
		}, function success(res){
			showToast(res.msg)
			if(res.code == 0){
				dismissDialog()
				reloadParent()
			}
		}, function error(err){
			showToast("更新失败，请重试..")
		}
		)
	}
})