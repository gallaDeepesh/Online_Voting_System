package secure_voting_backend.service;

import org.springframework.stereotype.Service;
import secure_voting_backend.dto.CandidateRequest;
import secure_voting_backend.dto.CandidateResponse;
import secure_voting_backend.entity.Candidate;
import secure_voting_backend.entity.Election;
import secure_voting_backend.repository.CandidateRepository;
import secure_voting_backend.repository.ElectionRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CandidateService {

    private final CandidateRepository candidateRepository;
    private final ElectionRepository electionRepository;

    public CandidateService(CandidateRepository candidateRepository,
                            ElectionRepository electionRepository) {
        this.candidateRepository = candidateRepository;
        this.electionRepository = electionRepository;
    }

    public Candidate addCandidate(CandidateRequest request) {

        Election election = electionRepository.findById(request.getElectionId())
                .orElseThrow(() -> new RuntimeException("Election not found"));

        Candidate candidate = new Candidate();
        candidate.setName(request.getName());
        candidate.setPartyName(request.getPartyName());
        candidate.setImageUrl(request.getSymbol());
        candidate.setElection(election);

        return candidateRepository.save(candidate);
    }

    public List<CandidateResponse> getCandidatesByElection(Long electionId) {

        List<Candidate> candidates =
                candidateRepository.findByElectionId(electionId);

        return candidates.stream()
                .map(candidate -> new CandidateResponse(
                        candidate.getId(),
                        candidate.getName(),
                        candidate.getPartyName(),
                        candidate.getImageUrl()
                ))
                .toList();
    }

    public LocalDateTime getEndTime(Long electionId) {
        Election election = electionRepository.findById(electionId)
                .orElseThrow(() -> new RuntimeException("Election not found"));
        return election.getEndTime();

    }
}