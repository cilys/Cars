package com.cilys.cars.web.model;

import com.cilys.cars.web.road.InitStationLine;
import com.jfinal.plugin.activerecord.Model;

import java.util.List;

/**
 * Created by admin on 2020/5/15.
 */
public class StationModel extends Model<StationModel> {
    private static StationModel dao = new StationModel();

    public static boolean insert(String name, int x, int y){
        StationModel m = new StationModel();
        m.set("name", name);
        m.set("x", x);
        m.set("y", y);
        InitStationLine.resetCache();
        return m.save();
    }

    public static boolean updateStation(int id, String name, int x, int y){
        StationModel m = queryById(id);
        if (m == null){
            return false;
        }
        m.set("name", name);
        m.set("x", x);
        m.set("y", y);
        InitStationLine.resetCache();
        return m.update();
    }

    public static boolean stationExist(int x, int y){
        StationModel m = dao.findFirst("select * from t_station where x = " + x + " and y = " + y);
        return m != null;
    }

    public static boolean del(int id){
        InitStationLine.resetCache();
        return dao.deleteById(id);
    }

    public static List<StationModel> queryAll(){
        return dao.find("select * from t_station");
    }

    public static StationModel queryById(int id){
        return dao.findById(id);
    }
}
