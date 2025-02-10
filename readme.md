# Financial Seminar Management Platform

## Overview
The **Financial Seminar Management Platform** is a comprehensive system designed to streamline the organization and execution of financial seminars, workshops, investment conferences, and educational sessions. It serves as a central hub for financial institutions, professionals, and participants to plan, manage resources, and foster interactions.

## Features
### User Management
- Secure registration and login with JWT authentication.
- Role-based access control for institutions, professionals, and participants.

### Event Management
- Create, update, and manage financial seminars and workshops.
- Track event status (PENDING, IN_PROGRESS, COMPLETED).
- Assign professionals to events.

### Resource Management
- Allocate financial modeling tools, venue spaces, and educational content.
- Manage availability and usage of resources.

### Participant & Professional Interaction
- Enroll in events and track progress.
- Provide feedback for events and professionals.

## Technology Stack
### Backend:
- **Spring Boot** (RESTful API, JWT authentication)
- **Spring Security** (Role-based access control)
- **JPA/Hibernate** (ORM for database management)
- **MySQL** (Database)

### Frontend:
- **Angular** (User interface)
- **Reactive Forms** (Form validation and data handling)

### Security:
- **JWT Authentication** for secure API access
- **Spring Security** for role-based access control

## API Endpoints
### Authentication
- **Register User:** `POST /api/user/register`
- **Login User:** `POST /api/user/login`

### Institution Endpoints
- **Create Event:** `POST /api/institution/event`
- **Update Event:** `PUT /api/institution/event/{id}`
- **Get Events:** `GET /api/institution/events`
- **Add Resource:** `POST /api/institution/event/{eventId}/resource`
- **Assign Professional:** `POST /api/institution/event/{eventId}/professional?userId=1`

### Professional Endpoints
- **View Assigned Events:** `GET /api/professional/events?userId=1`
- **Update Event Status:** `PUT /api/professional/event/{id}/status?status=COMPLETED`
- **Provide Feedback:** `POST /api/professional/event/{eventId}/feedback?userId=1`

### Participant Endpoints
- **View All Events:** `GET /api/participant/events`
- **Enroll in Event:** `POST /api/participant/event/{eventId}/enroll?userId=1`
- **View Event Status:** `GET /api/participant/event/{id}/status`
- **Provide Feedback:** `POST /api/participant/event/{eventId}/feedback?userId=1`

## Setup and Installation
### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8+
- Angular CLI 15+
- Maven 3+

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/financial-seminar-platform.git
   cd financial-seminar-platform/backend
   ```
2. Configure **application.properties** for MySQL connection.
3. Run the backend:
   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Angular application:
   ```bash
   ng serve
   ```

## Security Configuration
- JWT-based authentication
- Role-based access using **hasAuthority()** in Spring Security
- Public endpoints:
  - `/api/user/register`
  - `/api/user/login`

## Contribution Guidelines
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit and push your changes.
4. Submit a pull request.

## License
This project is licensed under the **MIT License**.

## Contact
For any inquiries, reach out to **[Your Name]** at **your.email@example.com**.

---

**Happy Coding! 🚀**

