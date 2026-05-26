package secure_voting_backend.service;

import org.springframework.stereotype.Service;
import secure_voting_backend.dto.VoteRequest;
import secure_voting_backend.entity.Candidate;
import secure_voting_backend.entity.Election;
import secure_voting_backend.entity.User;
import secure_voting_backend.entity.Vote;
import secure_voting_backend.repository.CandidateRepository;
import secure_voting_backend.repository.ElectionRepository;
import secure_voting_backend.repository.UserRepository;
import secure_voting_backend.repository.VoteRepository;

@Service
public class VoteService {

    private final VoteRepository voteRepository;
    private final CandidateRepository candidateRepository;
    private final ElectionRepository electionRepository;
    private final UserRepository userRepository;

    public VoteService(
            VoteRepository voteRepository,
            CandidateRepository candidateRepository,
            ElectionRepository electionRepository,
            UserRepository userRepository) {

        this.voteRepository = voteRepository;
        this.candidateRepository = candidateRepository;
        this.electionRepository = electionRepository;
        this.userRepository = userRepository;
    }

    public String castVote(Long userId, VoteRequest request) {

        Candidate candidate = candidateRepository.findById(request.getCandidateId())
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        Election election = candidate.getElection();

        if (!election.isActive()) {
            throw new RuntimeException("Election is not active");
        }

        boolean alreadyVoted =
                voteRepository.existsByUserIdAndElectionId(userId, election.getId());

        if (alreadyVoted) {
            throw new RuntimeException("You already voted in this election");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Vote vote = new Vote();
        vote.setUser(user);
        vote.setCandidate(candidate);
        vote.setElection(election);

        voteRepository.save(vote);

        return "Vote cast successfully";
    }
}
