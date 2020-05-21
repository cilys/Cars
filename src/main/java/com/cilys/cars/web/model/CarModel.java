package com.cilys.cars.web.model;

import com.cily.utils.base.StrUtils;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

import java.util.Iterator;
import java.util.Map;

/**
 * Created by admin on 2020/5/14.
 */
public class CarModel extends Model<CarModel> {
    private static CarModel dao = new CarModel();

    public static boolean insert(CarModel c){
        if (c != null){
            return c.save();
        }
        return false;
    }

    public static boolean updateInfo(CarModel c){
        if (c != null){
            return c.update();
        }
        return false;
    }

    public static boolean updateCarStatus(int id, String carStatus){
        return Db.update("update t_car set carStatus = '" + carStatus + "' where id = " + id) > 0;
    }

    public static CarModel carNumExist(String carNum){
        if (StrUtils.isEmpty(carNum)){
            return null;
        }
        return dao.findFirst("select * from t_car where carNum = '" + carNum + "'");
    }

    public static Page<CarModel> queryAll(int pageNumber, int pageSize, String carStatus){
        if (StrUtils.isEmpty(carStatus)){
            return dao.paginate(pageNumber, pageSize, "select * ", "from t_car");
        }else {
            return dao.paginate(pageNumber, pageSize, "select * ",
                    "from t_car where carStatus = '" + carStatus + "'");
        }
    }

    public static boolean del(int id){
        return dao.deleteById(id);
    }

    @Override
    public CarModel removeNullValueAttrs() {
        Map<String, Object> attrs = _getAttrs();
        for (Iterator<Map.Entry<String, Object>> it = attrs.entrySet().iterator(); it.hasNext();) {
            Map.Entry<String, Object> e = it.next();
            if (e.getValue() == null) {
                it.remove();
                remove(e.getKey());
            }else {
                if (e.getValue() instanceof String){
                    if (StrUtils.isEmpty((String)e.getValue())){
                        it.remove();
                        remove(e.getKey());
                    }
                }
            }
        }
        return this;
    }
}
