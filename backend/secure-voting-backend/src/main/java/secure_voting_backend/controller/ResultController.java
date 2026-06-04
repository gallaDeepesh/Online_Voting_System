package secure_voting_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import secure_voting_backend.dto.ElectionStatsResponse;
import secure_voting_backend.dto.ResultResponse;
import secure_voting_backend.service.ResultService;

import java.util.List;

@RestController
@RequestMapping("/api/results")
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;

    @GetMapping("/{electionId}")
    public List<ResultResponse> getResults(
            @PathVariable Long electionId) {
        return resultService.getResults(electionId);
    }

    @GetMapping("/{electionId}/winner")
    public ResultResponse getWinner(
            @PathVariable Long electionId) {

        return resultService.getWinner(electionId);
    }
    @GetMapping("/{electionId}/stats")
    public ElectionStatsResponse getStats(
            @PathVariable Long electionId) {

        return resultService.getStatistics(electionId);
    }
}