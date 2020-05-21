package com.cilys.cars.web.model;

import com.cily.utils.base.StrUtils;
import com.cilys.cars.web.road.InitStationLine;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;

import java.util.List;

/**
 * Created by admin on 2020/5/16.
 */
public class RoadLineModel extends Model<RoadLineModel> {
    private static RoadLineModel dao = new RoadLineModel();

    public static boolean insert(List<RoadLineModel> ls){
        int[] result = Db.batchSave(ls, ls.size());

        InitStationLine.resetCache();

        for (Integer i : result){
            if (i > 0){
                return true;
            }
        }
        return false;
    }

    public static boolean delByLineName(String lineName){
        InitStationLine.resetCache();
        return Db.delete("delete from t_road_line where lineName = '" + lineName + "'") > 0;
    }

    public static List<RoadLineModel> queryAllLine(){
        return dao.find(
                StrUtils.join(
                        "select t_road_line.id as id, t_road_line.lineName as lineName, ",
                        "t_road_line.lineColor as lineColor, t_road_line.stationId as stationId, ",
                        "t_road_line.createTime as createTime, t_road_line.stationIndex as stationIndex, ",
                        "t_station.name as stationName, ",
                        "t_station.x as stationX, t_station.y as stationY ",
                        " from t_road_line left join ", "t_station ",
                        " on t_road_line.stationId = t_station.id order by t_road_line.stationIndex"
                )
        );
    }

    public static List<RoadLineModel> queryLineNames(){
        return dao.find(
                "select * from t_road_line"
        );
    }

    /**
     * 地点删除后，经过该地点的路线也全部被删除
     * @return
     */
    public static boolean delByStationId(int stationId){
        List<RoadLineModel> ls = dao.find("select lineName from t_road_line where stationId = " + stationId);
        if (ls != null && ls.size() > 0){
            for (RoadLineModel m : ls){
                String name = m.get("lineName");
                delByLineName(name);
            }
            InitStationLine.resetCache();
            return true;
        }
        return false;
    }

    public static List<RoadLineModel> getNextStations(int stationId){
        List<RoadLineModel> ls = dao.find("select * from t_road_line where nextStationId = " + stationId);
        return ls;
    }

    public final static int DISTANCE_MAX = 100000000;
    public static int getDistanceNextStation(int stationId, int nextStationId){
        if (stationId == nextStationId){
            return 0;
        }

        RoadLineModel roadLineModel = dao.findFirst("select * from t_road_line where stationId = "
                + stationId + " and nextStationId = " + nextStationId);
        if (roadLineModel == null){
            return DISTANCE_MAX;
        }

        StationModel currentStationModel = StationModel.queryById(stationId);
        StationModel nextStationModel = StationModel.queryById(nextStationId);
        int x = currentStationModel.getInt("x");
        int y = currentStationModel.getInt("y");

        int nextX = nextStationModel.getInt("x");
        int nextY = nextStationModel.getInt("y");

        int s = (Math.abs(x - nextX)) * (Math.abs(x - nextX)) + (Math.abs(y - nextY)) * (Math.abs(y - nextY));
        int dis = (int)Math.sqrt(s);

        return dis;
    }

    public static int getDistancePreStation(int stationId, int preStationId){
        if (stationId == preStationId){
            return 0;
        }

        RoadLineModel roadLineModel = dao.findFirst("select * from t_road_line where stationId = "
                + stationId + " and preStationId = " + preStationId);
        if (roadLineModel == null){
            return DISTANCE_MAX;
        }

        StationModel currentStationModel = StationModel.queryById(stationId);
        StationModel preStationModel = StationModel.queryById(preStationId);
        int x = currentStationModel.getInt("x");
        int y = currentStationModel.getInt("y");

        int nextX = preStationModel.getInt("x");
        int nextY = preStationModel.getInt("y");

        int s = (Math.abs(x - nextX)) * (Math.abs(x - nextX)) + (Math.abs(y - nextY)) * (Math.abs(y - nextY));
        int dis = (int)Math.sqrt(s);

        return dis;
    }
}
