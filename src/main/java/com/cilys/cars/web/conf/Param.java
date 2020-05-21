package com.cilys.cars.web.conf;

import com.cily.utils.base.StrUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by admin on 2018/1/30.
 */
public class Param {
    public final static String DEVICE_IMEI = "deviceImei";

    public final static String PAGE_NUMBER = "pageNumber";
    public final static String PAGE_SIZE = "pageSize";
    public final static String SEARCH_TEXT = "searchText";
    public final static String OS_TYPE = "osType";


    //错误码规则：0成功；1~99系统错误；1001~1999用户相关错误
    public final static String C_SUCCESS = "0";

    public final static String C_SERVER_ERROR = "11";

    public final static String C_404 = "404";
    public final static String C_500 = "500";

    public final static String C_USER_NOT_EXIST = "1001";
    public final static String C_USER_NOT_LOGIN = "1002";
    public final static String C_USER_LOGIN_ON_OTHER = "1003";
    public final static String C_USER_OR_PWD_ERROR = "1006";
    public final static String C_USER_NAME_NULL = "1011";
    public final static String C_USER_NAME_ILLAGLE = "1012";

    public final static String C_USER_DEL_FAILED = "1021";

    public final static String C_PWD_NULL = "1031";
    public final static String C_PWD_ILLAGLE = "1032";
    public final static String C_PWD_NEW_NULL = "1033";
    public final static String C_PWD_NOT_EQUAL = "1034";
    public final static String C_PWD_CHANGE_FAILED = "1035";

    public final static String C_REAL_NAME_TOO_LONG = "1041";

    public final static String C_PHONE_ILLAGLE = "1051";

    public final static String C_ID_CARD_ILLAGLE = "1061";


    public final static String C_RESIGT_USER_EXISTS = "1101";
    public final static String C_REGIST_FAILURE = "1106";


    public final static String C_USER_ID_NULL = "1111";
    public final static String C_TOKEN_NULL = "1112";
    public final static String C_TOKEN_ERROR = "1113";

    public final static String C_USER_INFO_UPDATE_FAILURE = "1121";
    public final static String C_USER_INFO_NO_UPDATE = "1122";


    public final static String C_RECORD_ID_NULL = "2111";
    public final static String C_RECORD_ID_NOT_EXIST = "2112";
    public final static String C_NO_RIGHT_DEL_OTHER_USER_ROCORD = "2121";

    public final static String C_SEARCH_TEXT_NULL = "3001";
    public final static String C_SEARCH_TEXT_TOO_LONG = "3002";

    public final static String C_RIGHT_LOW = "4001";

    public final static String C_CAR_NUM_EXIST = "5001";
    public final static String C_CAR_ADD_FAILED = "5002";
    public final static String C_CAR_UPDATE_FAILED = "5003";
    public final static String C_CAR_DEL_FAILED = "5004";

    public final static String C_STATION_LOCATION_EXIST = "5031";
    public final static String C_STATION_ADD_FAILED = "5032";
    public final static String C_STATION_UPDATE_FAILED = "5033";
    public final static String C_STATION_DEL_FAILED = "5034";

    public final static String C_ROAD_LINE_DEL_FAILED = "5051";
    public final static String C_ROAD_LINE_ADD_FAILED = "5052";
    public final static String C_TASK_ADD_FAILED = "5061";
    public final static String C_TASK_DEL_FAILED = "5062";
    public final static String C_TASK_UPDATE_FAILED = "5063";




    private final static Map<String, String> failureInfo = new HashMap<>();

    static {
        failureInfo.put(C_SUCCESS, "操作成功");
        failureInfo.put(C_SERVER_ERROR, "系统内部异常");
        failureInfo.put(C_USER_NOT_EXIST, "用户不存在");
        failureInfo.put(C_USER_OR_PWD_ERROR, "用户名或密码错误");
        failureInfo.put(C_USER_NAME_NULL, "用户名为空");
        failureInfo.put(C_RESIGT_USER_EXISTS, "该账号已存在");
        failureInfo.put(C_REGIST_FAILURE, "注册失败");
        failureInfo.put(C_USER_ID_NULL, "用户id为空");
        failureInfo.put(C_TOKEN_NULL, "token为空");
        failureInfo.put(C_TOKEN_ERROR, "用户未登录或登录已失效");
        failureInfo.put(C_USER_INFO_UPDATE_FAILURE, "更新用户信息失败");
        failureInfo.put(C_USER_INFO_NO_UPDATE, "用户信息无更新");
        failureInfo.put(C_USER_NOT_LOGIN, "该用户未登录或登录已失效");
        failureInfo.put(C_USER_LOGIN_ON_OTHER, "该用户已在其他地方登录");
        failureInfo.put(C_USER_DEL_FAILED, "删除用户失败");
        failureInfo.put(C_USER_NAME_ILLAGLE, "用户名必须是2至30位的字母或数字或中划线或下划线");
        failureInfo.put(C_PWD_NULL, "密码为空");
        failureInfo.put(C_PWD_ILLAGLE, "密码不合法");

        failureInfo.put(C_404, "找不到路径");
        failureInfo.put(C_500, "系统内部异常");
        failureInfo.put(C_PHONE_ILLAGLE, "手机号码不合法");
        failureInfo.put(C_ID_CARD_ILLAGLE, "身份证号不合法");
        failureInfo.put(C_SEARCH_TEXT_NULL, "待搜索的内容为空");
        failureInfo.put(C_SEARCH_TEXT_TOO_LONG, "搜索内容过长");
        failureInfo.put(C_RECORD_ID_NULL, "物料id为空");
        failureInfo.put(C_RECORD_ID_NOT_EXIST, "物料信息不存在");
        failureInfo.put(C_NO_RIGHT_DEL_OTHER_USER_ROCORD, "无权删除其他人的发布");
        failureInfo.put(C_PWD_NEW_NULL, "新密码为空");
        failureInfo.put(C_PWD_NOT_EQUAL, "原密码错误");
        failureInfo.put(C_PWD_CHANGE_FAILED, "修改密码失败");

        failureInfo.put(C_RIGHT_LOW, "权限不足");

        failureInfo.put(C_CAR_NUM_EXIST, "该车辆编号已存在");
        failureInfo.put(C_CAR_ADD_FAILED, "添加车辆失败");
        failureInfo.put(C_CAR_UPDATE_FAILED, "更新车辆信息失败");
        failureInfo.put(C_CAR_DEL_FAILED, "更新车辆信息失败");
        failureInfo.put(C_STATION_LOCATION_EXIST, "该位置已有站点");
        failureInfo.put(C_STATION_ADD_FAILED, "添加地点失败");
        failureInfo.put(C_STATION_UPDATE_FAILED, "更新地点失败");
        failureInfo.put(C_STATION_DEL_FAILED, "删除地点失败");
        failureInfo.put(C_ROAD_LINE_DEL_FAILED, "删除路线失败");
        failureInfo.put(C_ROAD_LINE_ADD_FAILED, "添加路线失败");
        failureInfo.put(C_TASK_ADD_FAILED, "分派任务失败");
        failureInfo.put(C_TASK_DEL_FAILED, "删除任务失败");
        failureInfo.put(C_TASK_UPDATE_FAILED, "更新状态失败");
//        failureInfo.put(, );
//        failureInfo.put(, );
//        failureInfo.put(, );
//        failureInfo.put(, );
//        failureInfo.put(, );
    }

    public final static String getMsg(String code) {
        if (StrUtils.isEmpty(code)) {
            code = C_SERVER_ERROR;
        }
        return failureInfo.get(code);
    }

    public final static String REGX_PHONE = "1[0-9]{10}";
    public final static String REQUEST_SOURCE_WEB = "1";
    public final static String REQUEST_SOURCE_ANDROID = "2";
    public final static String REQUEST_SOURCE_IOS = "3";
}