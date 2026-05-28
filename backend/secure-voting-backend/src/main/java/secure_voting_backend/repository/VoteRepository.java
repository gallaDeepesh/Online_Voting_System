package secure_voting_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import secure_voting_backend.dto.ResultResponse;
import secure_voting_backend.entity.Vote;

import java.util.List;

public interface VoteRepository extends JpaRepository<Vote,Long> {
    boolean existsByUserIdAndElectionId(Long userId, Long electionId);

    @Query("""
       SELECT new secure_voting_backend.dto.ResultResponse(
       v.candidate.name,
       COUNT(v))
       FROM Vote v
       WHERE v.election.id = :electionId
       GROUP BY v.candidate.name
       ORDER BY COUNT(v) DESC
       """)
    List<ResultResponse> getElectionResults(Long electionId);

    Long countByElectionId(Long electionId);
}
