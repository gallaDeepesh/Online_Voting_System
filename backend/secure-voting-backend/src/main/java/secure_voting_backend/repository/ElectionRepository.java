package secure_voting_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import secure_voting_backend.entity.Election;

import java.time.LocalDateTime;
import java.util.List;

public interface ElectionRepository extends JpaRepository<Election, Long> {
    List<Election> findByStartTimeBeforeAndEndTimeAfter(
            LocalDateTime currentTime1,
            LocalDateTime currentTime2
    );
}
