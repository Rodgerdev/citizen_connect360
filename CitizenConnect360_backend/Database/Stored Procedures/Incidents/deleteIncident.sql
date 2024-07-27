USE CitizenConnect;
GO
CREATE OR ALTER PROCEDURE deleteIncident
    @id VARCHAR(36)
AS
BEGIN
    UPDATE Incidents
    SET isDeleted = 1, updatedAt = GETDATE()
    WHERE id = @id
END
