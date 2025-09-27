package lk.bitproject.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.bitproject.entity.EmployeeStatus;

public interface EmployeeStatusDao extends JpaRepository<EmployeeStatus,Integer>{

}
