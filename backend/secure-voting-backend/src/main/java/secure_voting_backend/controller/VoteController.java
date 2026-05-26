package secure_voting_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import secure_voting_backend.dto.VoteRequest;
import secure_voting_backend.entity.User;
import secure_voting_backend.repository.UserRepository;
import secure_voting_backend.service.VoteService;

@RestController
@RequestMapping("/vote")
public class VoteController {

    private final UserRepository userRepository;

    private final VoteService voteService;

    public VoteController(UserRepository userRepository, VoteService voteService) {
        this.userRepository = userRepository;
        this.voteService = voteService;
    }

    @PostMapping
    public String vote(Authentication authentication,
                       @RequestBody VoteRequest request) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return voteService.castVote(user.getId(), request);
    }
}
