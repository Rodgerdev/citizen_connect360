USE CitizenConnect;
GO
CREATE OR ALTER PROCEDURE updateView
    @id VARCHAR(36),
    @title NVARCHAR(255),
    @description NVARCHAR(MAX)
AS
BEGIN
    UPDATE Views
    SET title = @title, description = @description, updatedAt = GETDATE()
    WHERE id = @id AND isDeleted = 0
END
