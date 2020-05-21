package com.cilys.cars.web.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.cilys.cars.web.conf.Param;
import com.cilys.cars.web.interceptor.OptionMethodInterceptor;
import com.cilys.cars.web.model.RoadLineModel;
import com.cilys.cars.web.road.InitStationLine;
import com.jfinal.aop.Before;
import com.jfinal.kit.HttpKit;

import java.lang.reflect.Type;
import java.util.*;

/**
 * Created by admin on 2020/5/16.
 */
@Before({OptionMethodInterceptor.class})
public class RoadLineController extends BaseController {

    public void addLine(){
        String param = HttpKit.readData(getRequest());
        Type type = new TypeReference<List<Map<String, Object>>>(){}.getType();
        List<Map<String, Object>> ls = JSON.parseObject(param, type);
        List<RoadLineModel> rs = new ArrayList<>();
        if (ls != null && ls.size() > 0){
            for (int i = 0; i < ls.size(); i++) {
                RoadLineModel m = new RoadLineModel();
                m._setAttrs(ls.get(i));

                rs.add(m);
            }
        }
        if (RoadLineModel.insert(rs)){
            renderJsonSuccess(null);
        } else {
            renderJsonFailed(Param.C_ROAD_LINE_ADD_FAILED, null);
        }
    }

    public void delRoadLine(){
        String lineName = getParam("lineName");
        if (RoadLineModel.delByLineName(lineName)){
            renderJsonSuccess(null);
        }else {
            renderJsonFailed(Param.C_ROAD_LINE_DEL_FAILED, null);
        }
    }

    public void queryAllLine(){
        List<RoadLineModel> ls = RoadLineModel.queryAllLine();
        if (ls != null){
            Map<String, List<RoadLineModel>> map = new HashMap<>();
            for (RoadLineModel m : ls){
                String lineName = m.get("lineName");
                if (map.containsKey(lineName)){
                    List<RoadLineModel> r = map.get(lineName);
                    if (r == null){
                        r = new ArrayList<>();
                    }
                    r.add(m);
                    map.put(lineName, r);
                }else {
                    List<RoadLineModel> r = new ArrayList<>();
                    r.add(m);
                    map.put(lineName, r);
                }
            }
            List<List<RoadLineModel>> data = new ArrayList<>();
            for (String key : map.keySet()){
                data.add(map.get(key));
            }
            renderJsonSuccess(data);
        }else {
            renderJsonSuccess(ls);
        }
    }

    public void getShortLine(){
        int startStationId = getInt("startStationId");
        int endStationId = getInt("endStationId");
        renderJsonSuccess(InitStationLine.getShortLine(startStationId, endStationId));
    }
}