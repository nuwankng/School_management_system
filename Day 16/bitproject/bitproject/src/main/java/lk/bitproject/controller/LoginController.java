package lk.bitproject.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.RequestMapping;



@RestController
public class LoginController {

    @RequestMapping(value="/login")
    public ModelAndView loadLoginUI() {
        ModelAndView loginUI= new ModelAndView();
        loginUI.setViewName("login.html");
        return loginUI;
    }

    @RequestMapping(value="/dashboad")
    public ModelAndView loadDashboadUI() {
        ModelAndView dashboadUI= new ModelAndView();
        dashboadUI.setViewName("dashboad.html");
        return dashboadUI;
    }

}
