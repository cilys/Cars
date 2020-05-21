$(document).ready(function(){
	
	$("#btn_add").on('click', function(){
		var name = $("#input_name").val()
		if(strIsEmpty(name)){
			showToast("请输入名称")
			return;
		}
		
		var num = $("#input_num").val()
		if(strIsEmpty(num)){
			showToast("请输入编号")
			return;
		}
		
		var status = $('input:radio[name="carStatus"]:checked').val();
		
		var myDate = new Date;
    	var year = myDate.getFullYear(); //获取当前年
    	var mon = myDate.getMonth() + 1; //获取当前月
    	var date = myDate.getDate(); //获取当前日
    	var carSignTime = year + "-" + (mon < 10 ? ("0" + mon) : mon) + "-" + (date < 10 ? ("0" + date) : date);
        
		add(name, num, carSignTime, status)
	});
	
	function add(name, num, carSignTime, status){
		postBody(getHost() + "car/addCar", 
		{
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
			showToast("添加失败，请重试..")
		}
		)
	}
	
})