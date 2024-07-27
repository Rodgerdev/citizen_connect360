USE CitizenConnect;
GO
CREATE OR ALTER PROCEDURE getIncidents
AS
BEGIN
    SELECT * FROM Incidents WHERE isDeleted = 0
END
