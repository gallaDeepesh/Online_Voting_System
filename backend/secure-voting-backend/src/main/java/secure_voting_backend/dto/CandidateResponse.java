package secure_voting_backend.dto;

public class CandidateResponse {

    private Long id;
    private String name;
    private String partyName;
    private String imageUrl;

    public CandidateResponse() {
    }

    public CandidateResponse(Long id, String name,
                             String partyName,
                             String imageUrl) {
        this.id = id;
        this.name = name;
        this.partyName = partyName;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public String getPartyName() {
        return partyName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPartyName(String partyName) {
        this.partyName = partyName;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}