USE CitizenConnect;
GO
CREATE OR ALTER PROCEDURE addIncident
    @id VARCHAR(36),
    @title NVARCHAR(255),
    @description NVARCHAR(MAX),
    @multimedia NVARCHAR(MAX),
    @userId VARCHAR(36)
AS
BEGIN
    INSERT INTO Incidents (id, title, description, multimedia, userId)
    VALUES (@id, @title, @description, @multimedia, @userId)
END
