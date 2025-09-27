package lk.bitproject.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import lk.bitproject.entity.Employee;

public interface EmployeeDao extends JpaRepository<Employee, Integer> {

  @Query(value = "SELECT lpad(max(e.emp_no)+1,8,0) FROM myproject24.employee as e;", nativeQuery = true)
  String getNextEmpNo();

  @Query(value = "select e from Employee e where e.nic=?1")
  Employee getByNIC(String nic);

  @Query(value ="select e from Employee e where e.email=:email" )
  Employee getByEmail(@Param("email")String email);

}
