package lk.bitproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lk.bitproject.dao.EmployeeStatusDao;

import lk.bitproject.entity.EmployeeStatus;

@RestController

public class EmployeeStatusController {

    @Autowired
    private EmployeeStatusDao employeeStatusDao;

    //request mapping for load employee status all data-->[employee_status/alldata]
    @GetMapping(value="/employee_status/alldata" , produces = "application/json")
    public List<EmployeeStatus>findAllData(){
        return employeeStatusDao.findAll();
}
}