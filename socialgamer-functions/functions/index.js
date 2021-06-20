const functions = require("firebase-functions");
const app = require("express")();
const {
  getAllSquawks,
  postOneSquawk,
  fetchOneSquawk,
  commentOnSquawk,
  deleteSquawk,
} = require("./handlers/squawks");
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markNotificationsRead,
} = require("./handlers/users");
const { db } = require("./utils/admin");
const fireAuth = require("./utils/FireAuthorization");

/**
 * SQUAWK ROUTES
 */
app.get("/squawks", getAllSquawks);
app.post("/squawk", fireAuth, postOneSquawk);
app.get("/squawk/:squawkId", fireAuth, fetchOneSquawk);
app.post("/squawk/:squawkId/comment", fireAuth, commentOnSquawk);
app.post("/notifications", fireAuth, markNotificationsRead);
app.delete("/squawk/:squawkId", fireAuth, deleteSquawk);

/**
 * USERS ROUTES
 */
app.post("/signup", signup);
app.post("/login", login);
app.put("/user/image", fireAuth, uploadImage);
app.post("/user/", fireAuth, addUserDetails);
app.get("/user", fireAuth, getAuthenticatedUser);
app.get("/user/:handle", getUserDetails);

exports.api = functions.https.onRequest(app);

//TODO: FIX ISSUES with these triggers below
//Notification
exports.createNotificationOnComment = functions.firestore
  .document("comments/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(`/squawks/${snapshot.data().squawkId}`)
      .get()
      .then((doc) => {
        if (
          doc.exists &&
          doc.data().userHandle === snapshot.data().userHandle
        ) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "comment",
            read: false,
            squawkId: doc.id,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });

// //On image change
// exports.onUserImageChange = functions.firestore
//   .document("/users/{userId}")
//   .onUpdate((change) => {
//     console.log(change.before.data());
//     console.log(change.after.data());
//     if (change.before.data().imageUrl !== change.after.data().imageUrl) {
//       console.log("image was changed");
//       const batch = db.batch();
//       return db
//         .collection("squawks")
//         .where("userHandle", "==", change.before.data().handle)
//         .get()
//         .then((data) => {
//           data.forEach((doc) => {
//             const squawk = db.doc(`/squawks/${doc.id}`);
//             batch.update(squawk, { userImage: change.after.data().imageUrl });
//           });
//           return batch.commit();
//         });
//     } else {
//       return true;
//     }
//   });

// //On squawk delete
// exports.onSquawkDelete = functions.firestore
//   .document("/squawks/{squawkId}")
//   .onDelete((snapshot, context) => {
//     const squawkId = context.params.squawkId;
//     const batch = db.batch();
//     return db
//       .collection("comments")
//       .where("squawkId", "==", squawkId)
//       .get()
//       .then((data) => {
//         data.forEach((doc) => {
//           batch.delete(db.doc(`/comments/${doc.id}`));
//         });
//         return db
//           .collection("notifications")
//           .where("squawkId", "==", squawkId)
//           .get();
//       })
//       .then((data) => {
//         data.forEach((doc) => {
//           batch.delete(db.doc(`/notifications/${doc.id}`));
//         });
//         return batch.commit();
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   });
