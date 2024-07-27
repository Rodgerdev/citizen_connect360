CREATE OR ALTER PROCEDURE addAiChat
    @id VARCHAR(36),
    @query NVARCHAR(255),
    @response NVARCHAR(MAX),
    @userId VARCHAR(36)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO aiChats (id, query, response, userId)
    VALUES (@id, @query, @response, @userId);
END
