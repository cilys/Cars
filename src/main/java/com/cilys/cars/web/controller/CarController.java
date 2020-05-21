package com.cilys.cars.web.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.cilys.cars.web.conf.Param;
import com.cilys.cars.web.interceptor.OptionMethodInterceptor;
import com.cilys.cars.web.model.CarModel;
import com.jfinal.aop.Before;
import com.jfinal.kit.HttpKit;

import java.lang.reflect.Type;
import java.util.Map;

/**
 * Created by admin on 2020/5/14.
 */
@Before({OptionMethodInterceptor.class})
public class CarController extends BaseController {

    public void addCar(){
        String param = HttpKit.readData(getRequest());
        Type type = new TypeReference<Map<String, Object>>(){}.getType();
        Map<String, Object> map = JSON.parseObject(param, type);
        String carNum = (String)map.get("carNum");
        if (CarModel.carNumExist(carNum) != null){
            renderJsonFailed(Param.C_CAR_NUM_EXIST, null);
            return;
        }
        CarModel c = new CarModel();
        c._setAttrs(map);
        c.removeNullValueAttrs();

        if (CarModel.insert(c)){
            renderJsonSuccess(null);
        }else {
            renderJsonFailed(Param.C_CAR_ADD_FAILED, null);
        }
    }

    public void queryAll(){
        String carStatus = getParam("carStatus");
        renderJsonSuccess(CarModel.queryAll(getPageNumber(), getPageSize(), carStatus));
    }

    public void updateCar(){
        String param = HttpKit.readData(getRequest());
        Type type = new TypeReference<Map<String, Object>>(){}.getType();
        Map<String, Object> map = JSON.parseObject(param, type);
        String carNum = (String)map.get("carNum");

        CarModel car = CarModel.carNumExist(carNum);
        if ((int)map.get("id") != (int)car.get("id")) {
            if (CarModel.carNumExist(carNum) != null) {
                renderJsonFailed(Param.C_CAR_NUM_EXIST, null);
                return;
            }
        }
        CarModel c = new CarModel();
        c._setAttrs(map);
        c.removeNullValueAttrs();

        if (CarModel.updateInfo(c)){
            renderJsonSuccess(null);
        }else {
            renderJsonFailed(Param.C_CAR_UPDATE_FAILED, null);
        }
    }

    public void delCar(){
        int id = getInt("id");
        if (CarModel.del(id)){
            renderJsonSuccess(null);
        }else {
            renderJsonFailed(Param.C_CAR_DEL_FAILED, null);
        }
    }
}
