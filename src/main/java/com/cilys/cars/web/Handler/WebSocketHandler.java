package com.cilys.cars.web.Handler;


import com.jfinal.handler.Handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class WebSocketHandler extends Handler {
    @Override
    public void handle(String target, HttpServletRequest request, HttpServletResponse response, boolean[] isHandled) {
        if (target.contains("/websocket/room")){
            return;
        }
        next.handle(target, request, response, isHandled);
    }
}
