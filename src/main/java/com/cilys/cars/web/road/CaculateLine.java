package com.cilys.cars.web.road;

import com.cily.utils.base.StrUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by admin on 2020/5/16.
 */
public class CaculateLine {
    public static int[] dijkstra(int[][] weight, String[] stations, int start) {
        // 接受一个有向图的权重矩阵，和一个起点编号start（从0编号，顶点存在数组中）
        // 返回一个int[] 数组，表示从start到它的最短路径长度
        int n = weight.length; // 顶点个数
        int[] shortPath = new int[n]; // 保存start到其他各点的最短路径
        String[] path = new String[n]; // 保存start到其他各点最短路径的字符串表示
        String[] pathStation = new String[n];//保存路径的站点名称
        for (int i = 0; i < n; i++) {
            path[i] = new String(start + "-->" + i);
            if (stations != null) {
                pathStation[i] = new String(stations[start] + "-->" + stations[i]);
            }
        }
        int[] visited = new int[n]; // 标记当前该顶点的最短路径是否已经求出,1表示已求出

        // 初始化，第一个顶点已经求出
        shortPath[start] = 0;
        visited[start] = 1;

        for (int count = 1; count < n; count++) { // 要加入n-1个顶点
            int k = -1; // 选出一个距离初始顶点start最近的未标记顶点
            int dmin = Integer.MAX_VALUE;
            for (int i = 0; i < n; i++) {
                if (visited[i] == 0 && weight[start][i] < dmin) {
                    dmin = weight[start][i];
                    k = i;
                }
            }

            // 将新选出的顶点标记为已求出最短路径，且到start的最短路径就是dmin
            shortPath[k] = dmin;
            visited[k] = 1;

            // 以k为中间点，修正从start到未访问各点的距离
            for (int i = 0; i < n; i++) {
                //如果 '起始点到当前点距离' + '当前点到某点距离' < '起始点到某点距离', 则更新
                if (visited[i] == 0 && weight[start][k] + weight[k][i] < weight[start][i]) {
                    weight[start][i] = weight[start][k] + weight[k][i];
                    path[i] = path[k] + "-->" + i;
                    if (stations != null) {
                        pathStation[i] = pathStation[k] + "-->" + stations[i];
                    }
                }
            }
        }
        for (int i = 0; i < n; i++) {
            System.out.println("从" + start + "出发到" + i + "的最短路径为：" + path[i]);
            if (stations != null) {
                System.out.println("从【" + stations[start] + "】出发到【" + stations[i] + "】的最短路径为：" + pathStation[i]);

            }
        }
        int end = 5;
        if (stations != null) {
            System.out.println("从【" + stations[start] + "】出发到【" + stations[end] + "】的最短路径为：" + pathStation[end]);

        }
        return shortPath;
    }

    public static List<Map<String, Object>> dijkstraPath(int[][] weight, String[] stations, int start, int end){


        // 接受一个有向图的权重矩阵，和一个起点编号start（从0编号，顶点存在数组中）
        // 返回一个int[] 数组，表示从start到它的最短路径长度
        int n = weight.length; // 顶点个数
        int[] shortPath = new int[n]; // 保存start到其他各点的最短路径
        String[] path = new String[n]; // 保存start到其他各点最短路径的字符串表示
        String[] pathStation = new String[n];//保存路径的站点名称
        for (int i = 0; i < n; i++) {
            path[i] = new String(start + "-->" + i);
            pathStation[i] = new String(stations[start] + "-->" + stations[i]);
        }
        int[] visited = new int[n]; // 标记当前该顶点的最短路径是否已经求出,1表示已求出

        // 初始化，第一个顶点已经求出
        shortPath[start] = 0;
        visited[start] = 1;

        for (int count = 1; count < n; count++) { // 要加入n-1个顶点
            int k = -1; // 选出一个距离初始顶点start最近的未标记顶点
            int dmin = Integer.MAX_VALUE;
            for (int i = 0; i < n; i++) {
                if (visited[i] == 0 && weight[start][i] < dmin) {
                    dmin = weight[start][i];
                    k = i;
                }
            }

            // 将新选出的顶点标记为已求出最短路径，且到start的最短路径就是dmin
            shortPath[k] = dmin;
            visited[k] = 1;

            // 以k为中间点，修正从start到未访问各点的距离
            for (int i = 0; i < n; i++) {
                //如果 '起始点到当前点距离' + '当前点到某点距离' < '起始点到某点距离', 则更新
                if (visited[i] == 0 && weight[start][k] + weight[k][i] < weight[start][i]) {
                    weight[start][i] = weight[start][k] + weight[k][i];

                    path[i] = path[k] + "-->" + i;
                    pathStation[i] = pathStation[k] + "-->" + stations[i];
                }
            }
        }
        for (int i = 0; i < n; i++) {
            System.out.println("从" + start + "出发到" + i + "的最短路径为：" + path[i]);
            System.out.println("从【" + stations[start] + "】出发到【" + stations[i] + "】的最短路径为：" + pathStation[i]);
        }

        List<Map<String, Object>> result = new ArrayList<>();
            String p = pathStation[end];
            if (!StrUtils.isEmpty(p) && p.contains("-->")){
                String[] ps = p.split("-->");
                for (int i = 0; i < ps.length; i++){
                    Map<String, Object> map = new HashMap<>();
                    map.put("stationId", ps[i]);
//                    map.put("distance", );
                    map.put("totalDistance", shortPath[end]);
                    result.add(map);
                }
            }

//        return shortPath;
        return result;
    }
}
