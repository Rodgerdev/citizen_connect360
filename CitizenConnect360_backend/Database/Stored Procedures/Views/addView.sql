USE CitizenConnect;
GO
CREATE OR ALTER PROCEDURE addView
    @id VARCHAR(36),
    @title NVARCHAR(255),
    @description NVARCHAR(MAX),
    @userId VARCHAR(36)
AS
BEGIN
    INSERT INTO Views (id, title, description, userId)
    VALUES (@id, @title, @description, @userId)
END
