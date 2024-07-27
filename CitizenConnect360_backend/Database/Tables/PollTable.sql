USE CitizenConnect;

CREATE TABLE Polls (
    id VARCHAR(36) PRIMARY KEY,
    question NVARCHAR(255) NOT NULL,
    options NVARCHAR(MAX),
    isDeleted INT DEFAULT 0,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);
