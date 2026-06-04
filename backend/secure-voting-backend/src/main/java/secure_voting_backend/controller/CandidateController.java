package secure_voting_backend.controller;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import secure_voting_backend.dto.CandidateRequest;
import secure_voting_backend.dto.CandidateResponse;
import secure_voting_backend.entity.Candidate;
import secure_voting_backend.service.CandidateService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    private final CandidateService candidateService;

    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @PostMapping
    public Candidate addCandidate(@Valid @RequestBody CandidateRequest request) {
        return candidateService.addCandidate(request);
    }

    @GetMapping("/election/{electionId}")
    public List<CandidateResponse> getCandidatesByElection(
            @PathVariable Long electionId) {

        return candidateService.getCandidatesByElection(electionId);
    }

    @GetMapping("/election/endtime/{electionId}")
    public LocalDateTime getEndTime(@PathVariable Long electionId){
        return candidateService.getEndTime(electionId);
    }


    
}
