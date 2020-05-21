package com.cilys.cars.web.road;

import com.cilys.cars.web.model.RoadLineModel;
import com.cilys.cars.web.model.StationModel;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by admin on 2020/5/16.
 */
public class InitStationLine {
    private static int[][] cacheStationDistance = null;
    private static String[] cacheStationIds = null;
    private static Map<Integer, StationModel> cacheStationIndex = null;

    public static void resetCache(){
        cacheStationDistance = null;
        cacheStationIds = null;
        cacheStationIndex = null;
        cacheDistanceBetweenStation = null;
    }

    public static void initStation(){
        if (cacheStationDistance != null){
            return;
        }

        List<StationModel> stations = StationModel.queryAll();
        if (stations != null){
            int[][] stationsDistance = new int[stations.size()][stations.size()];
            cacheStationIds = new String[stations.size()];
            cacheStationIndex = new HashMap<>();

            for (int i = 0; i < stations.size(); i++){
                int currentStationId = stations.get(i).getInt("id");
                String iName = stations.get(i).get("name");
                cacheStationIds[i] = String.valueOf(currentStationId);
                cacheStationIndex.put(i, stations.get(i));

                for (int j = 0; j < stations.size(); j++){
                    String jName = stations.get(j).get("name");
                    if (i == j){
                        stationsDistance[i][j] = 0;
                        System.out.println(String.format("车站(%s)，与车站(%s)，相距：%d", iName, jName, 0));
                        continue;
                    }

                    int targetStationId = stations.get(j).getInt("id");

                    int dis = getDistanceBetweenStation(currentStationId, targetStationId);

                    System.out.println(String.format("车站(%s)，与车站(%s)，相距：%d",
                            iName, jName, dis));

                    stationsDistance[i][j] = dis;
                }
            }
            cacheStationDistance = stationsDistance;
        }
        return;
    }

    public static List<Map<String, Object>> getShortLine(int startStationId, int endStationId){
        cacheStationDistance = null;
        initStation();

        if (cacheStationDistance == null){
            return null;
        }
        int start = getIndex(startStationId);
        int end = getIndex(endStationId);
        if (start == -1 || end == -1){
            return null;
        }

        List<Map<String, Object>> lines = CaculateLine.dijkstraPath(cacheStationDistance, cacheStationIds, start, end);
        int totalDistance = 0;
        for (Map<String, Object> m : lines){
            totalDistance = (int)m.get("totalDistance");
            int stationId = Integer.parseInt((String)m.get("stationId"));
            StationModel stationModel = getStationModel(stationId);
            if (stationModel != null){
                for (Map.Entry<String, Object> e : stationModel._getAttrsEntrySet()) {
                    m.put(e.getKey(), e.getValue());
                }
            }

        }
        System.out.println("总距离：" + totalDistance);

        if (totalDistance >= RoadLineModel.DISTANCE_MAX){
            return null;
        }

        return lines;
    }

    private static StationModel getStationModel(int stationId){
        if (cacheStationIndex != null){
            for (Integer index : cacheStationIndex.keySet()){
                StationModel m = cacheStationIndex.get(index);
                if (m.getInt("id") == stationId){
                    return m;
                }
            }
        }
        return null;
    }

    private static int getIndex(int stationId) {
        if (cacheStationIndex != null){
            for (Integer index : cacheStationIndex.keySet()){
                StationModel m = cacheStationIndex.get(index);
                if (m.getInt("id") == stationId){
                    return index;
                }
            }
        }
        return -1;
    }

    private static int getDistanceBetweenStation(int currentStationId, int targetStationId){
        int cacheDis = getCacheDistance(currentStationId, targetStationId);
        if (cacheDis < 0) {
            int dis = Math.min(
                    RoadLineModel.getDistanceNextStation(currentStationId, targetStationId),
                    RoadLineModel.getDistancePreStation(currentStationId, targetStationId));
            putCacheDistance(currentStationId, targetStationId, dis);
            return dis;
        }else {
            return cacheDis;
        }
    }

    private static Map<String, Integer> cacheDistanceBetweenStation;
    private static void putCacheDistance(int currentStationId, int targetStationId, int dis){

        int p = Math.min(currentStationId, targetStationId);
        int n = Math.max(currentStationId, targetStationId);
        if (cacheDistanceBetweenStation == null){
            cacheDistanceBetweenStation = new HashMap<>();
        }

        cacheDistanceBetweenStation.put(p + "_" + n, dis);
    }
    private static int getCacheDistance(int currentStationId, int targetStationId){

        int p = Math.min(currentStationId, targetStationId);
        int n = Math.max(currentStationId, targetStationId);
        if (cacheDistanceBetweenStation == null){
            return -1;
        }
        System.out.println("cacheDistanceBetweenStation = " + cacheDistanceBetweenStation);
        Integer i = cacheDistanceBetweenStation.get(p + "_" + n);
        if (i == null){
            return -1;
        }
        return i;
    }
}