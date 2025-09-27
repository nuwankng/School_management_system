package lk.bitproject.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // this class generate as an entity
@Table(name="designation")  //Table mapping

@Data   //setter and getter
@NoArgsConstructor  //default constructor
@AllArgsConstructor //Generate AllArgument constructor
public class Designation {

    @Id //PK
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Auto Increment

    private Integer id;
    private String name;

}
