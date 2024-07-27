USE CitizenConnect;
GO
CREATE OR ALTER PROCEDURE updatePoll
    @id VARCHAR(36),
    @question NVARCHAR(255),
    @options NVARCHAR(MAX)
AS
BEGIN
    UPDATE Polls
    SET question = @question, options = @options, updatedAt = GETDATE()
    WHERE id = @id AND isDeleted = 0
END
