const express = require("express");
const authenticate = require("../../middleware/authenticate");
const State = require("../../models/state");
const Exam = require("../../models/exam");
const Detail = require("../../models/details");
const Update = require("../../models/updates");
const Admit = require("../../models/admit");
const Result = require("../../models/result");
const router = express.Router();

router.post("/state", async (req, res) => {
  try {
    if (req.body.type === "State") {
      State.find()
        .sort({ date: -1 })
        .then((exam) => res.json(exam));
    }
  } catch (err) {}
});

router.post("/category", async (req, res) => {
  try {
    if (req.body.categoryMain && req.body.categoryBase) {
      const categoryMain = req.body.categoryMain.trim();
      const categoryBase = req.body.categoryBase.trim();
      Exam.find({
        categoryMain: categoryMain,
        categoryBase: categoryBase,
      }).then((exam) => res.json(exam));
    } else if (req.body.categoryMain) {
      const categoryMain = req.body.categoryMain.trim();
      Exam.find({ categoryMain: categoryMain }).then((exam) => res.json(exam));
    } else if (req.body.categoryBase) {
      const categoryBase = req.body.categoryBase.trim();
      Exam.find({ categoryBase: categoryBase }).then((exam) => res.json(exam));
    }
  } catch (err) {}
});

router.post("/get", async (req, res) => {
  try {
    const abbreviation = req.body.abbreviation.trim();
    Detail.find({ abbreviation: abbreviation }).then((exam) => res.json(exam));
  } catch (err) {}
});

router.post("/type", async (req, res) => {
  try {
    switch (req.body.type.trim()) {
      case "New_Updates": {
        Update.find({ name: req.body.name.trim() }).then((update) =>
          res.json(update)
        );
        break;
      }
      case "Admit_Card": {
        Admit.find({ name: req.body.name.trim() }).then((admit) =>
          res.json(admit)
        );
        break;
      }
      case "Result": {
        Result.find({ name: req.body.name.trim() }).then((result) =>
          res.json(result)
        );
        break;
      }
      default: {
        res.json({ message: "No Update" });
      }
    }
  } catch (err) {}
});

router.post("/updates", async (req, res) => {
  try {
    switch (req.body.type.trim()) {
      case "New_Updates": {
        Update.find()
          .sort({ date: -1 })
          .limit(20)
          .then((update) => {
            var arr = update.map((upd) => {
              return {
                _id: upd._id,
                name: upd.name,
              };
            });
            res.json(arr);
          });
        break;
      }
      case "Admit_Card": {
        Admit.find()
          .sort({ date: -1 })
          .limit(20)
          .then((admit) => {
            var arr = admit.map((adm) => {
              return {
                _id: adm._id,
                name: adm.name,
              };
            });
            res.json(arr);
          });
        break;
      }
      case "Result": {
        Result.find()
          .sort({ date: -1 })
          .limit(20)
          .then((result) => {
            var arr = result.map((re) => {
              return {
                _id: re._id,
                name: re.name,
              };
            });
            res.json(arr);
          });
        break;
      }
      default: {
        res.json({ message: "Getting Updates" });
      }
    }
  } catch (err) {}
});

router.post("/search", async (req, res) => {
  try {
    var result = [];
    var reg = new RegExp(req.body.abbreviation.trim(), "i");
    var exam = Exam.find({ abbreviation: reg })
      .sort({ updated_at: -1 })
      .sort({ created_at: -1 })
      .limit(20);
    exam.exec(function (err, data) {
      if (!err) {
        if (data && data.length && data.length > 0) {
          data.forEach((exa) => {
            let obj = {
              id: exa._id,
              abbreviation: exa.abbreviation,
              categoryBase: exa.categoryBase,
            };
            if (exa.categoryBase === "Board Exams") {
              obj.categoryBase = "state exams/" + exa.categoryMain;
            }
            result.push(obj);
          });
          res.json(result);
        } else {
          exam = "";
          res.status(404).json({ message: "Not Found" });
        }
      }
    });
  } catch (err) {}
});

router.post("/user", authenticate, async (req, res) => {
  try {
    res.json({ message: req.body.data });
  } catch (err) {}
});

module.exports = router;
