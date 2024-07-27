USE CitizenConnect;

CREATE TABLE Incidents (
    id VARCHAR(36) PRIMARY KEY,
    title NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX),
    multimedia NVARCHAR(MAX),
    userId VARCHAR(36) FOREIGN KEY REFERENCES Users(id),
    isDeleted INT DEFAULT 0,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);
