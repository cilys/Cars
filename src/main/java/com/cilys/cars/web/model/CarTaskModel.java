package com.cilys.cars.web.model;

import com.cily.utils.base.StrUtils;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.DbKit;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;

/**
 * Created by admin on 2020/5/17.
 */
public class CarTaskModel extends Model<CarTaskModel> {
    private static CarTaskModel dao = new CarTaskModel();

    public static boolean insert(CarTaskModel m){
        return m != null && m.save();
    }

    public static boolean updateTaskStatus(int id, String taskStatus){
        return Db.update("update t_car_task set taskStatus = '" + taskStatus
                + "' where " + "id = " + id) > 0;
    }

    public static Page<CarTaskModel> queryAll(int pageNumber, int pageSize, String userId) {
        if (StrUtils.isEmpty(userId)) {
            return dao.paginate(pageNumber, pageSize, "select * ",
                    " from t_car_task order by taskStatus desc");
        }else {
            return dao.paginate(pageNumber, pageSize, "select * ",
                    " from t_car_task where userId = '" + userId + "' order by taskStatus desc");
        }
    }

    public static boolean del(int id){
        return dao.deleteById(id);
    }
}
