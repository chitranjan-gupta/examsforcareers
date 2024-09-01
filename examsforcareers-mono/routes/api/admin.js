const Exam = require("../../models/exam");
const Detail = require("../../models/details");
const Update = require("../../models/updates");
const Admit = require("../../models/admit");
const Result = require("../../models/result");
const User = require("../../models/user");
const auth = require("../../middleware/adminauth");
const express = require("express");
const router = express.Router();

router.get("/users", auth, async (req, res) => {
  try {
    User.find()
      .sort({ date: -1 })
      .then((users) => res.json(users));
  } catch (err) {}
});

router.get("/users/:id", auth, async (req, res) => {
  try {
    User.findById(req.params.id)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(404).json({ success: false }));
  } catch (err) {}
});

router.delete("/users/del/:id", auth, async (req, res) => {
  try {
    User.findById(req.params.id)
      .then((user) => user.remove().then(() => res.json({ success: true })))
      .catch((err) => res.status(404).json({ success: false }));
  } catch (err) {}
});

router.get("/exams", auth, async (req, res) => {
  //console.log(req.query);
  try {
    Exam.find()
      .sort({ date: -1 })
      .limit(20)
      .then((exams) => res.json(exams));
  } catch (err) {}
});

router.get("/exams/:id", auth, async (req, res) => {
  try {
    Exam.findById(req.params.id)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(404).json({ success: false }));
  } catch (err) {}
});

router.post("/exams/add", auth, async (req, res) => {
  try {
    switch (req.body.type.trim()) {
      case "New_Exam": {
        const exam = await Exam.findOne({
          abbreviation: req.body.abbreviation,
        });
        if (exam) {
          res.status(422).json({ message: "Exam Already Exists" });
        } else {
          const newExam = new Exam({
            name: req.body.name,
            abbreviation: req.body.abbreviation,
            link: req.body.link,
            logo: req.body.logo,
            categoryMain: req.body.categoryMain,
            categoryBase: req.body.categoryBase,
          });
          const newexam = await newExam.save();
          res.status(200).json(newexam);
        }
        break;
      }
      case "New_Detail": {
        const exam = await Detail.findOne({
          abbreviation: req.body.abbreviation,
        });
        if (exam) {
          res.status(422).json({ message: "Exam Already Exists" });
        } else {
          const newExam = new Detail({
            name: req.body.name,
            abbreviation: req.body.abbreviation,
            link: req.body.link,
            logo: req.body.logo,
            intro: req.body.intro,
            type: req.body.type,
            duration: req.body.duration,
            times: req.body.times,
            eligibility: req.body.eligibility,
            language: req.body.language,
            wikipedia: req.body.wikipedia,
            regSdate: req.body.regSdate,
            regEdate: req.body.regEdate,
            lfeedate: req.body.lfeedate,
            admit: req.body.admit,
            examdate: req.body.examdate,
            genobcfee: req.body.genobcfee,
            scstfee: req.body.scstfee,
            phfee: req.body.phfee,
          });
          const newexam = await newExam.save();
          res.status(200).json(newexam);
        }
        break;
      }
      case "New_Updates": {
        const newUpdate = new Update({
          name: req.body.name,
          intro: req.body.intro,
          fee: req.body.fee,
          date: req.body.date,
          req: req.body.req,
          link: req.body.link,
        });
        const newupdate = await newUpdate.save();
        res.json(newupdate);
        break;
      }
      case "Admit_Card": {
        const newAdmit = new Admit({
          name: req.body.name,
          intro: req.body.intro,
          date: req.body.date,
          isAvail: req.body.isAvail,
          link: req.body.link,
          note: req.body.note,
        });
        const newadmit = await newAdmit.save();
        res.json(newadmit);
        break;
      }
      case "Result": {
        const newResult = new Result({
          name: req.body.name,
          intro: req.body.intro,
          date: req.body.date,
          isAvail: req.body.isAvail,
          link: req.body.link,
          note: req.body.note,
        });
        const newresult = await newResult.save();
        res.json(newresult);
        break;
      }
      default: {
        res.json({ message: "Waiting" });
      }
    }
  } catch (err) {}
});

router.put("/exams/update/:id", auth, async (req, res) => {
  try {
    switch (req.body.type) {
      case "New_Exam": {
        //const data = req.body.data;
        // const result = await Exam.updateOne(
        //   { _id: req.params.id },
        //   {
        //     $set: {
        //       categoryMain: data,
        //     },
        //   },
        //   { upsert: true }
        // );
        Exam.findById(req.params.id).then((exam) => {
          res.json(exam);
        });
        break;
      }
      case "New_Detail": {
        //const data = req.body.data;
        // const result = await Exam.updateOne(
        //   { _id: req.params.id },
        //   {
        //     $set: {
        //       categoryMain: data,
        //     },
        //   },
        //   { upsert: true }
        // );
        Detail.findById(req.params.id).then((exam) => {
          res.json(exam);
        });
        break;
      }
      case "New_Updates": {
        //const data = req.body.data;
        // const result = await Exam.updateOne(
        //   { _id: req.params.id },
        //   {
        //     $set: {
        //       categoryMain: data,
        //     },
        //   },
        //   { upsert: true }
        // );
        Update.findById(req.params.id).then((exam) => {
          res.json(exam);
        });
        break;
      }
      case "Admit_Card": {
        //const data = req.body.data;
        // const result = await Exam.updateOne(
        //   { _id: req.params.id },
        //   {
        //     $set: {
        //       categoryMain: data,
        //     },
        //   },
        //   { upsert: true }
        // );
        Admit.findById(req.params.id).then((exam) => {
          res.json(exam);
        });
        break;
      }
      case "Result": {
        //const data = req.body.data;
        // const result = await Exam.updateOne(
        //   { _id: req.params.id },
        //   {
        //     $set: {
        //       categoryMain: data,
        //     },
        //   },
        //   { upsert: true }
        // );
        Result.findById(req.params.id).then((exam) => {
          res.json(exam);
        });
        break;
      }
      default: {
        res.json({ message: "Waiting" });
      }
    }
  } catch (err) {}
});

router.delete("/exams/del/:id", auth, async (req, res) => {
  try {
    switch (req.body.type) {
      case "New_Exam": {
        Exam.findById(req.params.id)
          .then((exam) => exam.remove().then(() => res.json({ success: true })))
          .catch((err) => res.status(404).json({ success: false }));
        break;
      }
      case "New_Detail": {
        Detail.findById(req.params.id)
          .then((exam) => exam.remove().then(() => res.json({ success: true })))
          .catch((err) => res.status(404).json({ success: false }));
        break;
      }
      case "New_Updates": {
        Update.findById(req.params.id)
          .then((exam) => exam.remove().then(() => res.json({ success: true })))
          .catch((err) => res.status(404).json({ success: false }));
        break;
      }
      case "Admit_Card": {
        Admit.findById(req.params.id)
          .then((exam) => exam.remove().then(() => res.json({ success: true })))
          .catch((err) => res.status(404).json({ success: false }));
        break;
      }
      case "Result": {
        Result.findById(req.params.id)
          .then((exam) => exam.remove().then(() => res.json({ success: true })))
          .catch((err) => res.status(404).json({ success: false }));
        break;
      }
      default: {
        res.json({ message: "Waiting" });
      }
    }
  } catch (err) {}
});

module.exports = router;
