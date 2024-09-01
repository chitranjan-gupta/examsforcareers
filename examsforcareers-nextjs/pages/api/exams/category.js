import dbConnect from "@/utils/dbConnect";
export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    const Exam = require("@/models/exam");
    await dbConnect();
    if (!req.body.pageNum) {
      req.body.pageNum = 0;
    }
    return new Promise((resolve) => {
      try {
        if (req.body.categoryMain && req.body.categoryBase) {
          const categoryMain = req.body.categoryMain.trim();
          const categoryBase = req.body.categoryBase.trim();
          Exam.find({
            categoryMain: categoryMain,
            categoryBase: categoryBase,
          })
            .sort({ date: -1 })
            .skip(req.body.pageNum * 20)
            .limit(20)
            .then((exam) => {
              res.status(200).json(exam);
              res.end();
              return resolve();
            });
        } else if (req.body.categoryMain) {
          const categoryMain = req.body.categoryMain.trim();
          Exam.find({ categoryMain: categoryMain })
            .sort({ date: -1 })
            .skip(req.body.pageNum * 20)
            .limit(20)
            .then((exam) => {
              res.status(200).json(exam);
              res.end();
              return resolve();
            });
        } else if (req.body.categoryBase) {
          const categoryBase = req.body.categoryBase.trim();
          Exam.find({ categoryBase: categoryBase })
            .sort({ date: -1 })
            .skip(req.body.pageNum * 20)
            .limit(20)
            .then((exam) => {
              res.status(200).json(exam);
              res.end();
              return resolve();
            });
        }
      } catch (err) {
        res.status(500).json([{ message: "Error In Server" }]);
        res.end();
        return resolve();
      }
    });
  } else {
    return new Promise((resolve) => {
      res.status(405).json({ message: "Method Not Allowed" });
      res.end();
      return resolve();
    });
  }
}
