const {
  _refWithOptions,
} = require("firebase-functions/lib/providers/database");
const { db } = require("../utils/admin");
const squawkCollection = db.collection("squawks");
/**
 * RETRIEVE ALL SQUAWKS
 * @param {*} req
 * @param {*} res
 */
exports.getAllSquawks = (req, res) => {
  squawkCollection
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let squawks = [];
      data.forEach((doc) => {
        squawks.push({
          ...doc.data(),
          squawkId: doc.id,
        });
      });
      return res.json(squawks);
    })
    .catch((err) => console.error(err));
};
/**
 * POST A SINGLE SQUAWK
 * @param {*} req
 * @param {*} res
 */
exports.postOneSquawk = (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Method not allowed!" });
  }
  const newSquawk = {
    body: req.body.body,
    userTag: req.user.handle,
    createdAt: new Date().toISOString(),
    commentCount: 0,
  };
  squawkCollection
    .add(newSquawk)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully!` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};
/**
 * Get A SQUAWK
 * @param {*} res
 * @param {*} req
 */
exports.fetchOneSquawk = (req, res) => {
  let squawkData = {};
  db.doc(`/squawks/${req.params.squawkId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Squawk Not Found" });
      }
      squawkData = doc.data();
      squawkData.squawkId = doc.id;
      return db
        .collection("comments")
        .where("squawkId", "==", req.params.squawkId)
        .get();
    })
    .then((data) => {
      squawkData.comments = [];
      data.forEach((doc) => {
        squawkData.comments.push(doc.data());
      });
      return res.json(squawkData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
/**
 * Add a comment
 * @param {*} req
 * @param {*} res
 */
exports.commentOnSquawk = (req, res) => {
  if (req.body.body.trim() === " ") {
    return res.status(400).json({ comment: "Cannot send empty comment" });
  }
  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    squawkId: req.params.squawkId,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl,
  };

  db.doc(`/squawks/${req.params.squawkId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Squawk Not Found" });
      }
      return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
    })
    .then(() => {
      // newComment.id = doc.id;
      return db.collection("comments").add(newComment);
    })
    .then(() => {
      return res.json(newComment);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    });
};
/**
 * TODO:ADD LIKES IN NEXT UPDATE
 */

/**
 * DELETE SQUAWK
 * @param {*} req
 * @param {*} res
 */
exports.deleteSquawk = (req, res) => {
  const document = db.doc(`/squawks/${req.params.squawkId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(500).json({ error: "Squawk Not found" });
      }
      if (doc.data().userTag !== req.user.handle) {
        res.status(403).json({ error: "Unauthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      return res.json({ message: "Squawk Deleted Successfully!" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
