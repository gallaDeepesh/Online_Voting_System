# Cloud-Based Online Voting System

## Overview

The Cloud-Based Online Voting System is a full-stack web application that enables secure and efficient online elections. The system supports multiple concurrent elections, role-based access control, candidate management, secure voting, and real-time result calculation.

The application is built using Spring Boot for the backend, React for the frontend, and MySQL as the database.

---

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT-Based Authentication
* Role-Based Access Control (Admin/User)
* Secure Password Encryption using BCrypt

### Election Management

* Create Elections
* Update Elections
* Delete Elections
* View Active Elections
* Support for Multiple Simultaneous Elections

### Candidate Management

* Add Candidates
* Update Candidate Information
* Delete Candidates
* View Candidates by Election

### Voting System

* Cast Vote Securely
* One Vote Per User Per Election
* Duplicate Vote Prevention
* Election Status Validation

### Results & Statistics

* Vote Counting
* Winner Calculation
* Election Statistics
* Result Dashboard

### Frontend Features

* Responsive User Interface
* Protected Routes
* Role-Based Navigation
* Admin Dashboard
* User Dashboard

---

## Technology Stack

### Backend

* Java 17
* Spring Boot
* Spring Security
* Spring Data JPA
* JWT Authentication
* Maven

### Frontend

* React
* React Router
* Axios
* CSS

### Database

* MySQL

### Tools

* Git
* GitHub
* Postman

---

## Project Architecture

```text
Frontend (React)
       │
       ▼
REST APIs
       │
       ▼
Backend (Spring Boot)
       │
       ▼
MySQL Database
```

---

## Database Entities

### User

* id
* name
* email
* password
* role

### Election

* id
* title
* description
* startTime
* endTime
* status

### Candidate

* id
* name
* party
* electionId

### Vote

* id
* userId
* candidateId
* electionId
* timestamp

---

## API Modules

### Authentication APIs

* Register User
* Login User

### Election APIs

* Create Election
* Get Elections
* Update Election
* Delete Election

### Candidate APIs

* Add Candidate
* Get Candidates
* Update Candidate
* Delete Candidate

### Voting APIs

* Cast Vote
* Vote Validation

### Result APIs

* Get Election Results
* Get Winner
* Get Election Statistics

---

## Security Features

* JWT Authentication
* Password Encryption using BCrypt
* Role-Based Authorization
* Protected API Endpoints
* Duplicate Vote Prevention
* Input Validation

---

## Project Statistics

* 25+ REST APIs
* 5+ Functional Modules
* Multiple Concurrent Election Support
* JWT Secured Authentication
* 100% Duplicate Vote Prevention

---

## Future Enhancements

### Cloud Deployment

* AWS EC2
* AWS RDS
* AWS S3

### DevOps

* Docker Containerization
* GitHub Actions CI/CD Pipeline

### Additional Features

* Candidate Image Upload
* Email Notifications
* Live Result Updates
* Audit Logging
* Cloud Monitoring

---

## Current Status

✅ Backend Development Completed

✅ Frontend Development Completed

✅ Authentication & Authorization Completed

✅ Election Management Completed

✅ Candidate Management Completed

✅ Voting Module Completed

✅ Result Calculation Completed

✅ API Integration Completed

⏳ AWS Deployment In Progress

⏳ Docker & CI/CD Pipeline Pending

---

## Author

Galla Deepesh

B.Tech Computer Science Engineering

Gitam University
