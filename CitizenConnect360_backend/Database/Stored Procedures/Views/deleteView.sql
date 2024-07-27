USE CitizenConnect;
GO
CREATE OR ALTER PROCEDURE deleteView
    @id VARCHAR(36)
AS
BEGIN
    UPDATE Views
    SET isDeleted = 1, updatedAt = GETDATE()
    WHERE id = @id
END
