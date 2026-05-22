package secure_voting_backend.controller;

import jakarta.persistence.GeneratedValue;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TestController {
    @PostMapping("/test")
    public String test(@RequestBody String str){
        return str+"hello world";
    }

    @GetMapping("/hello")
    public String hello(){
        return "hello";
    }


}
