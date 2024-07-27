CREATE OR ALTER PROCEDURE updateAiChat
    @id VARCHAR(36),
    @response NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE aiChats
    SET response = @response, updatedAt = GETDATE()
    WHERE id = @id AND isDeleted = 0;
END
