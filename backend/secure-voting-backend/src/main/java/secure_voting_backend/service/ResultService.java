package secure_voting_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import secure_voting_backend.dto.ElectionStatsResponse;
import secure_voting_backend.dto.ResultResponse;
import secure_voting_backend.repository.CandidateRepository;
import secure_voting_backend.repository.VoteRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResultService {

    private final VoteRepository voteRepository;
    private final CandidateRepository candidateRepository;

    public List<ResultResponse> getResults(Long electionId) {
        return voteRepository.getElectionResults(electionId);
    }

    public ResultResponse getWinner(Long electionId) {

        List<ResultResponse> results =
                voteRepository.getElectionResults(electionId);

        if(results.isEmpty()) {
            return null;
        }

        return results.get(0);
    }

    public ElectionStatsResponse getStatistics(Long electionId) {
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
