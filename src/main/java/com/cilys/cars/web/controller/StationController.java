package com.cilys.cars.web.controller;

import com.cilys.cars.web.conf.Param;
import com.cilys.cars.web.interceptor.OptionMethodInterceptor;
import com.cilys.cars.web.model.RoadLineModel;
import com.cilys.cars.web.model.StationModel;
import com.jfinal.aop.Before;

/**
 * Created by admin on 2020/5/15.
 */
@Before({OptionMethodInterceptor.class})
public class StationController extends BaseController {

    public void addStation(){
        String name = getParam("name");
        int x = getInt("x");
        int y = getInt("y");

        if (StationModel.stationExist(x, y)){
            renderJsonFailed(Param.C_STATION_LOCATION_EXIST, null);
            return;
        }
        if (StationModel.insert(name, x, y)){
            renderJsonSuccess(null);
            return;
        }else {
            renderJsonFailed(Param.C_STATION_ADD_FAILED, null);
            return;
        }
    }

    public void updateStation(){
        int id = getInt("id");
        String name = getParam("name");
        int x = getInt("x");
        int y = getInt("y");

        StationModel m = StationModel.queryById(id);
        if (x == m.getInt("x") && y == m.getInt("y")){
            if (StationModel.updateStation(id, name, x, y)){
                renderJsonSuccess(null);
                return;
            }else {
                renderJsonFailed(Param.C_STATION_UPDATE_FAILED, null);
                return;
            }
        }else {
            if (StationModel.stationExist(x, y)){
                renderJsonFailed(Param.C_STATION_LOCATION_EXIST, null);
            }else {
                if (StationModel.updateStation(id, name, x, y)){
                    renderJsonSuccess(null);
                    return;
                }else {
                    renderJsonFailed(Param.C_STATION_UPDATE_FAILED, null);
                    return;
                }
            }
        }
    }

    public void queryAll(){
        renderJsonSuccess(StationModel.queryAll());
    }

    public void delStation(){
        int id = getInt("id");
        if (StationModel.del(id)){
            RoadLineModel.delByStationId(id);

            renderJsonSuccess(null);
        }else {
            renderJsonFailed(Param.C_STATION_DEL_FAILED, null);
        }
    }
}
