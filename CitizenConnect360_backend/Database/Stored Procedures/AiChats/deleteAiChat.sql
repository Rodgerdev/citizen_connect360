CREATE OR ALTER PROCEDURE deleteAiChat
    @id VARCHAR(36)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE aiChats
    SET isDeleted = 1
    WHERE id = @id;
END
