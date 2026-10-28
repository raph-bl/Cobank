package com.cobank.backend.dto.response;

public class LoginResponse {
    private String status;
    private String message;
    private String firstName;
    private String lastName;

    /** Échec : pas d'identité à renvoyer. */
    public LoginResponse(String status, String message) {
        this.status = status;
        this.message = message;
    }

    public LoginResponse(String status, String message, String firstName, String lastName) {
        this.status = status;
        this.message = message;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getStatus() { return status; }
    public String getMessage() { return message; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }

    public void setStatus(String status) { this.status = status; }
    public void setMessage(String message) { this.message = message; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
}
