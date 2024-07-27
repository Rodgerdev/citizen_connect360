USE CitizenConnect;
GO
CREATE OR ALTER PROCEDURE updateUser
    @id VARCHAR(36),
    @name NVARCHAR(255),
    @email NVARCHAR(255),
    @password NVARCHAR(255),
    @role VARCHAR(255)
AS
BEGIN
    UPDATE Users
    SET name = @name, email = @email, password = @password, role = @role, updatedAt = GETDATE()
    WHERE id = @id AND isDeleted = 0
END
