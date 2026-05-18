package secure_voting_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    // Primary Key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Full Name
    @Column(nullable = false)
    private String Name;

    // Email
    @Column(nullable = false, unique = true)
    private String email;

    // Password
    @Column(nullable = false)
    private String password;

    // Voter ID
    @Column(unique = true)
    private String voterId;

    // Verification Status
    @Column(name = "is_verified",nullable = false )
    private boolean isVerified = false;

    // Created Time
    @Column(nullable = false)
    private LocalDateTime createdAt;

    // Relationship with Role Table
    @ManyToOne
    @JoinColumn(name = "role_id", nullable = true)
    private Role role;

    // Default Constructor
    public User() {
        this.createdAt = LocalDateTime.now();
    }

    // Parameterized Constructor
    public User(String Name, String email, String password,
                String voterId, Role role) {

        this.Name = Name;
        this.email = email;
        this.password = password;
        this.voterId = voterId;
        this.role = role;
        this.createdAt = LocalDateTime.now();
    }

    // =========================
    // Getters and Setters
    // =========================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String Name) {
        this.Name = Name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getVoterId() {
        return voterId;
    }

    public void setVoterId(String voterId) {
        this.voterId = voterId;
    }

    public boolean isVerified() {
        return isVerified;
    }

    public void setVerified(boolean verified) {
        isVerified = verified;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}