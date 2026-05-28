package secure_voting_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import secure_voting_backend.entity.Candidate;

import java.util.List;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    List<Candidate> findByElectionId(Long electionId);
    Long countByElectionId(Long electionId);
}