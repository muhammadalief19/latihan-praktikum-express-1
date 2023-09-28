const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/db.js");

// route get all
router.get("/", (req, res) => {
  connect.query(
    "SELECT D.*,K.nama_lengkap AS nama_ayah, I.nama_lengkap AS nama_ibu FROM detail_kk AS D LEFT JOIN ktp AS K ON D.ayah = K.nik LEFT JOIN ktp AS I ON D.ibu = I.nik",
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data Detail KK",
          payload: rows,
        });
      }
    }
  );
});

// route store
router.post(
  "/",
  [
    body("no_kk").notEmpty(),
    body("nik").notEmpty(),
    body("status").notEmpty(),
    body("ayah").notEmpty(),
    body("ibu").notEmpty(),
  ],
  (req, res) => {
    const error = validationResult(req);

    // if validation failed
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error,
      });
    }

    let data = {
      no_kk: req.body.no_kk,
      nik: req.body.nik,
      status: req.body.status,
      ayah: req.body.ayah,
      ibu: req.body.ibu,
    };
    connect.query("INSERT INTO detail_kk SET ? ", data, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
          error: err,
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data detail KK berhasil ditambahkan",
          payload: data,
        });
      }
    });
  }
);

// route get data by Id
router.get("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query(
    `SELECT * FROM detail_kk INNER JOIN kartu_keluarga ON detail_kk.no_kk = kartu_keluarga.no_kk INNER JOIN ktp ON detail_kk.nik = ktp.nik WHERE id_detail='${id}'`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data Detail KK",
          payload: rows,
        });
      }
    }
  );
});

// route update
router.patch("/(:id)", [body("status").notEmpty()], (req, res) => {
  const error = validationResult(req);

  // if validation failed
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error,
    });
  }
  let id = req.params.id;
  let data = {
    status: req.body.status,
  };
  connect.query(
    `UPDATE detail_kk SET ? WHERE id_detail='${id}'`,
    data,
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
          error: err,
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data detail KK berhasil diupdate",
          payload: data,
        });
      }
    }
  );
});

// route delete
router.delete("/(:id)", (req, res) => {
  let id = req.params.id;
  connect.query(
    `DELETE FROM detail_kk WHERE id_detail='${id}'`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data detail KK berhasil didelete",
        });
      }
    }
  );
});

module.exports = router;
