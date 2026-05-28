package secure_voting_backend.dto;

public class ElectionStatsResponse {

    private Long totalVotes;
    private Long totalCandidates;
    private String winner;

    public ElectionStatsResponse(
            Long totalVotes,
            Long totalCandidates,
            String winner) {

        this.totalVotes = totalVotes;
        this.totalCandidates = totalCandidates;
        this.winner = winner;
    }

    public Long getTotalVotes() {
        return totalVotes;
    }

    public Long getTotalCandidates() {
        return totalCandidates;
    }

    public String getWinner() {
        return winner;
    }
}