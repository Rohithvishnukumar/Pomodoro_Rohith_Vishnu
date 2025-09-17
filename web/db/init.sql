-- db/init.sql
CREATE DATABASE IF NOT EXISTS protimer_rohith;
USE protimer_rohith;

-- table referenced by testDB() SELECT * FROM user1
CREATE TABLE IF NOT EXISTS user1 (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255)
);

-- login table used by your auth
CREATE TABLE IF NOT EXISTS login (
  userid INT AUTO_INCREMENT PRIMARY KEY,
  usr VARCHAR(255) UNIQUE,
  pwd VARCHAR(255),
  email VARCHAR(255)
);

-- userdata table used by stats endpoint
CREATE TABLE IF NOT EXISTS userdata (
  userid INT,
  date_user DATE,
  time_user INT DEFAULT 0,
  PRIMARY KEY (userid, date_user),
  CONSTRAINT fk_userdata_user FOREIGN KEY (userid) REFERENCES login(userid) ON DELETE CASCADE
);
