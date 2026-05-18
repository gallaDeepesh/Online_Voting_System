package secure_voting_backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "candidates")
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Candidate Name
    @Column(nullable = false)
    private String name;

    // Political Party Name
    @Column(nullable = false)
    private String partyName;

    // Candidate Manifesto
    @Column(columnDefinition = "TEXT")
    private String manifesto;

    // Candidate Image URL
    private String imageUrl;

    // Creation Time
    @Column(nullable = false)
    private LocalDateTime createdAt;

    // Many Candidates -> One Election
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "election_id", nullable = false)
    private Election election;

    // One Candidate -> Many Votes
    @OneToMany(
            mappedBy = "candidate",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    private List<Vote> votes;

    // Default Constructor
    public Candidate() {
        this.createdAt = LocalDateTime.now();
    }

    // Parameterized Constructor
    public Candidate(String name,
                     String partyName,
                     String manifesto,
                     String imageUrl,
                     Election election) {

        this.name = name;
        this.partyName = partyName;
        this.manifesto = manifesto;
        this.imageUrl = imageUrl;
        this.election = election;
        this.createdAt = LocalDateTime.now();
    }

    // =========================
    // Getters and Setters
    // =========================

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPartyName() {
        return partyName;
    }

    public void setPartyName(String partyName) {
        this.partyName = partyName;
    }

    public String getManifesto() {
        return manifesto;
    }

    public void setManifesto(String manifesto) {
        this.manifesto = manifesto;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Election getElection() {
        return election;
    }

    public void setElection(Election election) {
        this.election = election;
    }

    public List<Vote> getVotes() {
        return votes;
    }

    public void setVotes(List<Vote> votes) {
        this.votes = votes;
    }
}