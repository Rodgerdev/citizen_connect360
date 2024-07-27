USE CitizenConnect;
GO
CREATE OR ALTER PROCEDURE updateIncident
    @id VARCHAR(36),
    @title NVARCHAR(255),
    @description NVARCHAR(MAX),
    @multimedia NVARCHAR(MAX)
AS
BEGIN
    UPDATE Incidents
    SET title = @title, description = @description, multimedia = @multimedia, updatedAt = GETDATE()
    WHERE id = @id AND isDeleted = 0
END
