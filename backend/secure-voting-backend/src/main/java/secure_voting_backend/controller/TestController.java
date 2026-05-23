package secure_voting_backend.controller;

import jakarta.persistence.GeneratedValue;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping("/hello")
    public String hello(){
        return "hello";
    }

    @GetMapping("/user")
    public String userAccess() {
        return "Hello USER!";
    }

    @GetMapping("/admin")
    public String adminAccess() {
        return "Hello ADMIN!";
    }



}
