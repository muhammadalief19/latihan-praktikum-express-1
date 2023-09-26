const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/db.js");

// route get all
router.get("/", (req, res) => {
  connect.query(
    "SELECT * FROM kartu_keluarga JOIN detail_kk ON kartu_keluarga.no_kk = detail_kk.no_kk",
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data KK",
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
    body("alamat").notEmpty(),
    body("rt").notEmpty(),
    body("rw").notEmpty(),
    body("kode_pos").notEmpty(),
    body("desa_kelurahan").notEmpty(),
    body("kecamatan").notEmpty(),
    body("kabupaten_kota").notEmpty(),
    body("provinsi").notEmpty(),
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
      alamat: req.body.alamat,
      rt: req.body.rt,
      rw: req.body.rw,
      kode_pos: req.body.kode_pos,
      desa_kelurahan: req.body.desa_kelurahan,
      kecamatan: req.body.kecamatan,
      kabupaten_kota: req.body.kabupaten_kota,
      provinsi: req.body.provinsi,
    };
    connect.query("INSERT INTO kartu_keluarga SET ? ", data, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
          error: err,
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data kartu keluarga berhasil ditambahkan",
          payload: data,
        });
      }
    });
  }
);

// get data by no kk
router.get("/(:no_kk)", (req, res) => {
  let no_kk = req.params.no_kk;
  connect.query(
    `SELECT * FROM kartu_keluarga WHERE no_kk='${no_kk}'`,
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
          message: "Data KK",
          payload: rows[0],
        });
      }
    }
  );
});

// router update
router.patch(
  "/(:no_kk)",
  [
    body("no_kk").notEmpty(),
    body("alamat").notEmpty(),
    body("rt").notEmpty(),
    body("rw").notEmpty(),
    body("kode_pos").notEmpty(),
    body("desa_kelurahan").notEmpty(),
    body("kecamatan").notEmpty(),
    body("kabupaten_kota").notEmpty(),
    body("provinsi").notEmpty(),
  ],
  (req, res) => {
    const error = validationResult(req);

    // if validation failed
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error,
      });
    }
    let no_kk = req.params.no_kk;
    let data = {
      no_kk: req.body.no_kk,
      alamat: req.body.alamat,
      rt: req.body.rt,
      rw: req.body.rw,
      kode_pos: req.body.kode_pos,
      desa_kelurahan: req.body.desa_kelurahan,
      kecamatan: req.body.kecamatan,
      kabupaten_kota: req.body.kabupaten_kota,
      provinsi: req.body.provinsi,
    };
    connect.query(
      `UPDATE kartu_keluarga SET ? WHERE no_kk='${no_kk}'`,
      data,
      (err, rows) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "Data kartu keluarga berhasil diupdate",
          });
        }
      }
    );
  }
);

// router delete
router.delete("/(:no_kk)", (req, res) => {
  let no_kk = req.params.no_kk;
  connect.query(
    `DELETE FROM kartu_keluarga WHERE no_kk='${no_kk}'`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data kartu keluarga berhasil didelete",
        });
      }
    }
  );
});

module.exports = router;
