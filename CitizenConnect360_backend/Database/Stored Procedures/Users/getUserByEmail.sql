USE CitizenConnect;
GO

CREATE OR ALTER PROCEDURE getUserByEmail
    @Email NVARCHAR(255)
AS
BEGIN
    SELECT *
    FROM Users
    WHERE email = @Email
      AND isDeleted = 0; 
END
GO
