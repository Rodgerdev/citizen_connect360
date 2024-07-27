CREATE OR ALTER PROCEDURE getAiChatById
    @id VARCHAR(36)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * FROM aiChats
    WHERE id = @id AND isDeleted = 0;
END
