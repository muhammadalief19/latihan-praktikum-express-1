const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connect = require("../config/db.js");

// route get all
router.get("/", (req, res) => {
  connect.query(
    "SELECT * FROM ktp JOIN detail_kk ON ktp.nik = detail_kk.nik",
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data Ktp",
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
    body("nik").notEmpty(),
    body("nama_lengkap").notEmpty(),
    body("jenis_kelamin").notEmpty(),
    body("tempat_lahir").notEmpty(),
    body("tanggal_lahir").notEmpty(),
    body("agama").notEmpty(),
    body("pendidikan").notEmpty(),
    body("jenis_pekerjaan").notEmpty(),
    body("golongan_darah").notEmpty(),
    body("kewarganegaraan").notEmpty(),
  ],
  (req, res) => {
    const error = validationResult(req);

    // if validation failed
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error,
      });
    }
    // data
    let data = {
      nik: req.body.nik,
      nama_lengkap: req.body.nama_lengkap,
      jenis_kelamin: req.body.jenis_kelamin,
      tempat_lahir: req.body.tempat_lahir,
      tanggal_lahir: req.body.tanggal_lahir,
      agama: req.body.agama,
      pendidikan: req.body.pendidikan,
      jenis_pekerjaan: req.body.jenis_pekerjaan,
      golongan_darah: req.body.golongan_darah,
      kewarganegaraan: req.body.kewarganegaraan,
    };
    connect.query("INSERT INTO ktp set ? ", data, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
          error: err,
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Data ktp berhasil ditambahkan",
          data: rows[0],
        });
      }
    });
  }
);

// route get by nik
router.get("/(:nik)", (req, res) => {
  let nik = req.params.nik;
  connect.query(`SELECT * FROM ktp WHERE nik='${nik}'`, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: "Not Found",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data Ktp",
        payload: rows[0],
      });
    }
  });
});

// router update
router.patch(
  "/(:nik)",
  [
    body("nik").notEmpty(),
    body("nama_lengkap").notEmpty(),
    body("jenis_kelamin").notEmpty(),
    body("tempat_lahir").notEmpty(),
    body("tanggal_lahir").notEmpty(),
    body("agama").notEmpty(),
    body("pendidikan").notEmpty(),
    body("jenis_pekerjaan").notEmpty(),
    body("golongan_darah").notEmpty(),
    body("kewarganegaraan").notEmpty(),
  ],
  (req, res) => {
    const error = validationResult(req);

    // if validation failed
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error,
      });
    }

    let nik = req.params.nik;

    // data
    let data = {
      nik: req.body.nik,
      nama_lengkap: req.body.nama_lengkap,
      jenis_kelamin: req.body.jenis_kelamin,
      tempat_lahir: req.body.tempat_lahir,
      tanggal_lahir: req.body.tanggal_lahir,
      agama: req.body.agama,
      pendidikan: req.body.pendidikan,
      jenis_pekerjaan: req.body.jenis_pekerjaan,
      golongan_darah: req.body.golongan_darah,
      kewarganegaraan: req.body.kewarganegaraan,
    };
    connect.query(`UPDATE ktp set ?  WHERE nik='${nik}'`, data, (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
          error: err,
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data ktp berhasil diupdate",
        });
      }
    });
  }
);

// router delete
router.delete("/(:nik)", (req, res) => {
  let nik = req.params.nik;
  connect.query(`DELETE FROM ktp WHERE nik='${nik}'`, (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data ktp berhasil di delete",
      });
    }
  });
});

module.exports = router;
