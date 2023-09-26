let mysql = require("mysql");

let connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_latihan1_express",
});

// Membuat kondisi atau pengecekan apakah koneksi berjalan atau tidak
connect.connect((error) => {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Koneksi ke database berhasil");
  }
});

module.exports = connect;
