package secure_voting_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import secure_voting_backend.entity.Vote;

public interface VoteRepository extends JpaRepository<Vote,Long> {
    boolean existsByUserIdAndElectionId(Long userId, Long electionId);
}
