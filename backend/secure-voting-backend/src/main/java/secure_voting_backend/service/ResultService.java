package secure_voting_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import secure_voting_backend.dto.ElectionStatsResponse;
import secure_voting_backend.dto.ResultResponse;
import secure_voting_backend.entity.Election;
import secure_voting_backend.repository.CandidateRepository;
import secure_voting_backend.repository.ElectionRepository;
import secure_voting_backend.repository.VoteRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResultService {

    private final VoteRepository voteRepository;
    private final CandidateRepository candidateRepository;
    private final ElectionRepository electionRepository;

    private void validateResultsAccess(Long electionId) {

        Election election = electionRepository.findById(electionId)
                .orElseThrow(() -> new RuntimeException("Election not found"));

        if (LocalDateTime.now().isBefore(election.getEndTime())) {
            throw new RuntimeException(
                    "Results are available only after election completion");
        }
    }

    public List<ResultResponse> getResults(Long electionId) {
        validateResultsAccess(electionId);
        return voteRepository.getElectionResults(electionId);
    }

    public ResultResponse getWinner(Long electionId) {

        validateResultsAccess(electionId);

        List<ResultResponse> results =
                voteRepository.getElectionResults(electionId);

        if(results.isEmpty()) {
            return null;
        }

        return results.get(0);
    }

    public ElectionStatsResponse getStatistics(Long electionId) {
        validateResultsAccess(electionId);
        Long totalVotes = voteRepository.countByElectionId(electionId);

        Long totalCandidates = candidateRepository.countByElectionId(electionId);

        ResultResponse winner = getWinner(electionId);

        String winnerName =
                winner != null ? winner.getCandidateName() : "No Winner";

        return new ElectionStatsResponse(
                totalVotes,
                totalCandidates,
                winnerName
        );
    }
}
