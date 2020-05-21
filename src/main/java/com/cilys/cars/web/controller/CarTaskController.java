package com.cilys.cars.web.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.cilys.cars.web.conf.Param;
import com.cilys.cars.web.model.CarModel;
import com.cilys.cars.web.model.CarTaskModel;
import com.jfinal.kit.HttpKit;

import java.lang.reflect.Type;
import java.util.Map;

/**
 * Created by admin on 2020/5/17.
 */
public class CarTaskController extends BaseController {

    public void addTask(){
        String param = HttpKit.readData(getRequest());
        Type type = new TypeReference<Map<String, Object>>(){}.getType();
        Map<String, Object> map = JSON.parseObject(param, type);
        int carId = Integer.parseInt((String)map.get("carId"));

        CarTaskModel c = new CarTaskModel();
        c._setAttrs(map);
        c.removeNullValueAttrs();

        if (CarTaskModel.insert(c)){
            CarModel.updateCarStatus(carId, "2");
            renderJsonSuccess(null);
        }else {
            renderJsonFailed(Param.C_TASK_ADD_FAILED, null);
        }
    }

    public void updateTaskStatus(){
        int taskId = getInt("id");
        int carId = getInt("carId");
        String status = getParam("taskStatus");
        if (CarTaskModel.updateTaskStatus(taskId, status)){
            CarModel.updateCarStatus(carId, status);
            renderJsonSuccess(null);
        }else {
            renderJsonFailed(Param.C_TASK_UPDATE_FAILED, null);
        }
    }

    public void queryAll(){
        String userId = getParam("userId");
        renderJsonSuccess(CarTaskModel.queryAll(getPageNumber(), getPageSize(), userId));
    }

    public void delTask(){
        int id = getInt("id");
        if (CarTaskModel.del(id)){
            renderJsonSuccess(null);
        }else {
            renderJsonFailed(Param.C_TASK_DEL_FAILED, null);
        }
    }

}
