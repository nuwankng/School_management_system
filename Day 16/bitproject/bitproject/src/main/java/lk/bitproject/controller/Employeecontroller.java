package lk.bitproject.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import lk.bitproject.dao.EmployeeDao;
import lk.bitproject.dao.EmployeeStatusDao;
import lk.bitproject.entity.Employee;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class Employeecontroller {

    @Autowired
    private EmployeeDao employeeDao;

    @Autowired
    private EmployeeStatusDao employeeStatusDao;

    // request mapping for load employee UI [URL --> /employee]
    @RequestMapping(value = "/employee")
    public ModelAndView loadEmployeeUI() {
        ModelAndView employeeUI = new ModelAndView();
        employeeUI.setViewName("employee.html");

        return employeeUI;
    }

    // request mapping for get employee all data [URL --> /employee/alldata]
    @GetMapping(value = "/employee/alldata", produces = "application/json")
    public List<Employee> findallData() {
        return employeeDao.findAll(Sort.by(Direction.DESC, "id"));
    }

    // request post mapping for insert employee data [URL --> /employee/insert]
    @PostMapping(value = "/employee/insert")
    public String saveEmployeeData(@RequestBody Employee employee) {

        // duplicate check
        Employee extEmployeeByNic = employeeDao.getByNIC(employee.getNic());
        if (extEmployeeByNic != null) {
            return "Save Not completed : Entered " + employee.getNic() + " NIC Value already Exist..!";
        }

        Employee extEmployeeByEmail = employeeDao.getByEmail(employee.getEmail());
        if (extEmployeeByEmail != null) {
            return "Save Not completed : Entered Email " + employee.getEmail() + " already Exist..!";
        }
        try {

            // set auto added data
            employee.setAdded_date_time(LocalDateTime.now());
            employee.setAdded_user_id(1);
            employee.setEmp_no(employeeDao.getNextEmpNo());
           

            // save operator
            employeeDao.save(employee);

            // dependances
            return "OK";

        } catch (Exception e) {
            return "Save Not Completed:" + e.getMessage();
        }
    }


    // request PUT mapping for update employee data [URL --> /employee/update]
    @PutMapping(value = "/employee/update")
    public String updateEmployeeData(@RequestBody Employee employee) {

        //check
        if (employee.getId()==null) {
           return "Update Not Completed , Employee Not Exist"; 
        }

        Employee extById = employeeDao.getReferenceById(employee.getId());
          if (extById == null) {
            return "Update Not Complete, Employee Not Exist";
         }
            

        //Duplicate check
        Employee extEmployeeByNic = employeeDao.getByNIC(employee.getNic());
        if (extEmployeeByNic != null && extEmployeeByNic.getId() != employee.getId())  {
            return "Save Not completed : Entered " + employee.getNic() + " NIC Value already Exist..!";
        }

        Employee extEmployeeByEmail = employeeDao.getByEmail(employee.getEmail());
        if (extEmployeeByEmail != null && extEmployeeByEmail.getId() !=employee.getId()) {
            return "Save Not completed : Entered Email " + employee.getEmail() + " already Exist..!";
        }

        try {

            // set auto added data
            employee.setUpdate_date_time(LocalDateTime.now());
            employee.setUpdate_user_id(1);
            

            // save operator
            employeeDao.save(employee);

            // dependances
            return "OK";

        } catch (Exception e) {
            return "Update Not Completed:" + e.getMessage();
        }

    }

    // request delete mapping for delete employee data [URL --> /employee/delete]
    @DeleteMapping(value = "employee/delete")
    public String deleteEmployee(@RequestBody Employee employee) {

        //check
        if (employee.getId()==null) {
            return "Delete Not Completed , Employee Not Exist"; 
         }
 
         
         Employee extEmployeeById = employeeDao.getReferenceById(employee.getId());
         if (extEmployeeById == null) {
             return "Delete Not Complete, Employee Not Exist";
          }

        try {

            // set auto added data
            extEmployeeById.setDelete_date_time(LocalDateTime.now());
            extEmployeeById.setDelete_user_id(1);
            extEmployeeById.setEmployee_status_id(employeeStatusDao.getReferenceById(3));

            // save operator
            employeeDao.save(extEmployeeById);

            // dependances
            return "OK";

        } catch (Exception e) {
            return "Delete Not Completed:" + e.getMessage();
        }

    }
}
