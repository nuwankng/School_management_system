package lk.bitproject.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class UserController {

    //request mapping for load user UI [URL-->/user]
    
    @RequestMapping(value = "/user")
    public ModelAndView loadUserUI(){
        ModelAndView userView=new ModelAndView();
        userView.setViewName("user.html");
        return userView;
    }

}
