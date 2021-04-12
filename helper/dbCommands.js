export const INIT_SECHUDLE_COMMAND =
  "CREATE TABLE IF NOT EXISTS sechudles" +
  "(id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, describtion TEXT NOT NULL, createDate TEXT NOT NULL,outDate TEXT NOT NULL,isDone INTEGER DEFAULT 0);";
export const FETCHED_SCHEDULE_COMMAND = "SELECT * FROM sechudles";
export const INSERT_SECHUDLE_COMMAND =
  "INSERT INTO sechudles(title,describtion,createDate,outDate) VALUES(?,?,?,?)";
export const DELETE_SECHUDLE_COMMAND = "DELETE FROM sechudles WHERE id = ?";
export const UPDATE_SECHUDLE_COMMAND =
  "UPDATE sechudles SET title = ? , describtion = ?, outDate = ?, isDone = ? WHERE id = ?";
// "[title,describtion,outDate,isDone,id]"
export const UPDATE_ISNODE_SECHUDLE_COMMAND =
  "UPDATE sechudles SET isDone = ? WHERE id = ?";

export const VIEW_SECHUDLE_COMMAND = "SELECT * FROM sechudles WHERE id = ?";