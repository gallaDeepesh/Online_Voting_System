package secure_voting_backend.dto;

public class ResultResponse {

    private String candidateName;
    private Long totalVotes;

    public ResultResponse(String candidateName, Long totalVotes) {
        this.candidateName = candidateName;
        this.totalVotes = totalVotes;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public Long getTotalVotes() {
        return totalVotes;
    }
}
