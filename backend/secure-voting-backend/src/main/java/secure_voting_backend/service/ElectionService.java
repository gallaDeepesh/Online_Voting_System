package secure_voting_backend.service;

import org.springframework.stereotype.Service;
import secure_voting_backend.dto.ElectionRequest;
import secure_voting_backend.dto.ElectionResponse;
import secure_voting_backend.entity.Election;
import secure_voting_backend.repository.ElectionRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ElectionService {

    private final ElectionRepository electionRepository;

    public ElectionService(ElectionRepository electionRepository) {
        this.electionRepository = electionRepository;
    }

    public ElectionResponse createElection(ElectionRequest request) {

        if (request.getEndTime().isBefore(request.getStartTime())) {
            throw new RuntimeException("End time must be after start time");
        }

        Election election = new Election();

        election.setTitle(request.getTitle());
        election.setDescription(request.getDescription());
        election.setStartTime(request.getStartTime());
        election.setEndTime(request.getEndTime());

        LocalDateTime now = LocalDateTime.now();

        boolean active =
                now.isAfter(request.getStartTime())
                        && now.isBefore(request.getEndTime());


        Election savedElection = electionRepository.save(election);

        return mapToResponse(savedElection);
    }

    public List<ElectionResponse> getActiveElections() {

        LocalDateTime now = LocalDateTime.now();

        List<Election> elections =
                electionRepository
                        .findByStartTimeBeforeAndEndTimeAfter(now, now);

        return elections.stream()
                .map(this::mapToResponse)
                .toList();
    }

    private ElectionResponse mapToResponse(Election election) {

        ElectionResponse response = new ElectionResponse();

        response.setId(election.getId());
        response.setTitle(election.getTitle());
        response.setDescription(election.getDescription());
        response.setStartTime(election.getStartTime());
        response.setEndTime(election.getEndTime());
        response.setActive(election.isActive());

        return response;
    }
    public ElectionResponse updateElection(Long id, ElectionRequest request) {

        Election election = electionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Election not found"));

        if (request.getEndTime().isBefore(request.getStartTime())) {
            throw new RuntimeException("End time must be after start time");
        }

        election.setTitle(request.getTitle());
        election.setDescription(request.getDescription());
        election.setStartTime(request.getStartTime());
        election.setEndTime(request.getEndTime());

        Election updatedElection = electionRepository.save(election);

        return mapToResponse(updatedElection);
    }
    public void deleteElection(Long id) {

        Election election = electionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Election not found"));

        electionRepository.delete(election);
    }
}