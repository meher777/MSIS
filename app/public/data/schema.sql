CREATE DATABASE IF NOT EXISTS msisdb2;
USE msisdb2;

DROP TABLE IF EXISTS Referee;
DROP TABLE IF EXISTS Game;

CREATE Table Game (
gameID INT NOT NULL,
field VARCHAR(255),
time VARCHAR(255),
CONSTRAINT PK_Referee PRIMARY KEY (gameID)
); 

Create Table Referee (
refID INT NOT NULL,
assignmentID INT NOT NULL,
gameID INT NOT NULL,
name VARCHAR(255),
age INT,
role VARCHAR(255),
grade VARCHAR(255),
rating INT,
status VARCHAR(50),
CONSTRAINT PK_Referee PRIMARY KEY (refID),
CONSTRAINT FK_RefereeGame FOREIGN KEY (gameID) references Game(gameID)
);

INSERT INTO Game (gameID, field, time) 
VALUES (1, "Woodlawn", "10:00");
INSERT INTO Referee (refID, assignmentID, gameID, name, age, role, grade, rating, status) 
VALUES (1, 1, 1, "Jim Turner", 24, "Assignor", "good", 10, "active");



-- SELECT * FROM Referee;
-- SELECT * FROM Game;