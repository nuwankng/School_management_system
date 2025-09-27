package lk.bitproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lk.bitproject.dao.Designationdao;
import lk.bitproject.entity.Designation;

@RestController
public class DesignationController {

    @Autowired  //Generate Instance
    private Designationdao designationdao;

//request mapping for load designation all data-->[designation/alldata]
    @GetMapping(value="/designation/alldata" , produces = "application/json")
    public List<Designation>findAllData(){
        return designationdao.findAll();
    }

}
