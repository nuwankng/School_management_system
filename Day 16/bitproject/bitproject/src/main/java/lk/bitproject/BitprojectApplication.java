package lk.bitproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@SpringBootApplication
@RestController //
public class BitprojectApplication {

	public static void main(String[] args) {
		SpringApplication.run(BitprojectApplication.class, args);

		System.out.println("hello world");
	}

	/*
	 * @RequestMapping(value="/index")
	 * public String index(){
	 * return "<h1>Hello world</h1>";
	 * }
	 */

	// mapping for return index page url

	@RequestMapping(value = { "/index", "/" })
	public ModelAndView uiIndexpage() {
		ModelAndView indexPage = new ModelAndView();
		indexPage.setViewName("index.html");
		return indexPage;
	}

}
