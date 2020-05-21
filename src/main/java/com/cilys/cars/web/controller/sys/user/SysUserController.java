package com.cilys.cars.web.controller.sys.user;

import com.cilys.cars.web.conf.Param;
import com.cilys.cars.web.conf.SQLParam;
import com.cilys.cars.web.controller.BaseController;
import com.cilys.cars.web.interceptor.*;
import com.cilys.cars.web.model.UserModel;
import com.cilys.cars.web.utils.UserUtils;
import com.jfinal.aop.Before;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by admin on 2018/2/5.
 */
//@Before({SysUserInterceptor.class})
public class SysUserController extends BaseController {

    @Before({OptionMethodInterceptor.class})
    public void addUser(){
        UserUtils.registByJsonData(this, getUserId());
    }

    @Before({UserIdInterceptor.class, UserNameInterceptor.class, PwdInterceptor.class,
            PhoneInterceptor.class})
    public void updateUserStatus(){
        UserUtils.updateUserInfo(this, getUserId(), getParam(SQLParam.USER_ID),
                getParam(SQLParam.STATUS));
    }

    @Before({OptionMethodInterceptor.class})
    public void updateUserInfo(){
        UserUtils.updateUserInfoByJsonData(this, getUserId());
    }

    public void getUsers(){
        String osType = getHeader("osType");

        renderJsonSuccess(UserModel.getUsersByStatus(getParam(SQLParam.STATUS),
                getParaToInt(Param.PAGE_NUMBER, 1),
                getParaToInt(Param.PAGE_SIZE, 10), SQLParam.USER_IDENTIFY, "asc", !"1".equals(osType)));
    }

    public void getUserCount(){
        long enableUserCount = UserModel.getEnableUserCount();
        long disableUserCount = UserModel.getDisableUserCount();

        Map<String, Long> map = new HashMap<>();
        map.put("enableUserCount", enableUserCount);
        map.put("disableUserCount", disableUserCount);
        renderJsonSuccess(map);
    }

    @Before({UserIdInterceptor.class})
    public void delUser() {
        String userId = getParam(SQLParam.USER_ID);
        if (UserModel.delByUserId(userId)) {
            renderJsonSuccess(null);
        }else {
            renderJsonFailed(Param.C_USER_DEL_FAILED, null);
        }
    }
}