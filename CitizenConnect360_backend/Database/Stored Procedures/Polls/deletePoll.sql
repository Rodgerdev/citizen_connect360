USE CitizenConnect;
GO
CREATE OR ALTER PROCEDURE deletePoll
    @id VARCHAR(36)
AS
BEGIN
    UPDATE Polls
    SET isDeleted = 1, updatedAt = GETDATE()
    WHERE id = @id
END
