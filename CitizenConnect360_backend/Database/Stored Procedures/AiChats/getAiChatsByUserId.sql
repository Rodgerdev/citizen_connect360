CREATE OR ALTER PROCEDURE getAiChatsByUserId
    @userId VARCHAR(36)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * FROM aiChats
    WHERE userId = @userId AND isDeleted = 0
    ORDER BY createdAt DESC;
END
