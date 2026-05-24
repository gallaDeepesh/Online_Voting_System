package secure_voting_backend.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import secure_voting_backend.dto.ElectionRequest;
import secure_voting_backend.dto.ElectionResponse;
import secure_voting_backend.service.ElectionService;

import java.util.List;

@RestController
@RequestMapping("/api/elections")
public class ElectionController {

    private final ElectionService electionService;

    public ElectionController(ElectionService electionService) {
        this.electionService = electionService;
    }

    @PostMapping
    public ResponseEntity<ElectionResponse> createElection(
            @Valid @RequestBody ElectionRequest request) {

        ElectionResponse response =
                electionService.createElection(request);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/active")
    public ResponseEntity<List<ElectionResponse>> getActiveElections() {

        List<ElectionResponse> responses =
                electionService.getActiveElections();

        return ResponseEntity.ok(responses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ElectionResponse> updateElection(
            @PathVariable Long id,
            @Valid @RequestBody ElectionRequest request) {

        ElectionResponse response =
                electionService.updateElection(id, request);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteElection(
            @PathVariable Long id) {

        electionService.deleteElection(id);

        return ResponseEntity.ok("Election deleted successfully");
    }
}