USE CitizenConnect;
GO
CREATE OR ALTER PROCEDURE addPoll
    @id VARCHAR(36),
    @question NVARCHAR(255),
    @options NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO Polls (id, question, options)
    VALUES (@id, @question, @options)
END
