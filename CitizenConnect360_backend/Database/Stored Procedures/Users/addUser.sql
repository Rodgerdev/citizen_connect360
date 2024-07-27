USE CitizenConnect;
GO
CREATE OR ALTER PROCEDURE addUser
    @id VARCHAR(36),
    @name NVARCHAR(255),
    @email NVARCHAR(255),
    @password NVARCHAR(255)
AS
BEGIN
    INSERT INTO Users (id, name, email, password)
    VALUES (@id, @name, @email, @password)
END
