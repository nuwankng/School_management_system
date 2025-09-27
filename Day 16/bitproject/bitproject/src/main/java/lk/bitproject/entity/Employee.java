package lk.bitproject.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="employee")
@AllArgsConstructor
@NoArgsConstructor
@Data

public class Employee {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="emp_no", unique=true)
    @Length(max = 8)
    @NotNull
    private String emp_no;

    @NotNull
    private String fullname;

    @NotNull
    private String callingname;

    @Column(name="nic", unique=true)
    @NotNull
    @Length(max = 12,min = 10)
    private String nic; 

    @Column(name="email", unique=true)
    @NotNull
    private String email;

    @NotNull
    private LocalDate dob;

    @NotNull
    private String gender;

    @Length(max = 10)
    @NotNull
    private String mobileno;

    @Length(max = 10)
    private String landno;

    @NotNull
    private String civil_status;

    @NotNull
    private String address;

    private String note;

    @NotNull
    private LocalDateTime added_date_time; 

    private LocalDateTime update_date_time;

    private LocalDateTime delete_date_time; 

    @NotNull
    private Integer added_user_id;

    
    private Integer update_user_id;

    
   private Integer delete_user_id;

    @ManyToOne
    @JoinColumn(name="designation_id" , referencedColumnName = "id")
    private Designation designation_id;

    @ManyToOne
    @JoinColumn(name="employee_status_id" , referencedColumnName = "id")
    private EmployeeStatus employee_status_id;

}
