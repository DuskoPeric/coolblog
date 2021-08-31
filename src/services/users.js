import { firestore } from "../firebase/firebase.utils";

export const addLike = async (userId, likedList) => {
    const userRef = await firestore.collection("users").doc(userId);
    userRef.set(
        {
            liked: likedList
        },
        { merge: true }
    );
}
export const changeUserName = async (userId, name) => {
    const userRef = await firestore
        .collection("users")
        .doc(userId);
    await userRef.set(
        {
            displayName: name
        },
        { merge: true }
    );
}

export const updateUserRole = async (userId, choosenRole) => {
    const userRef = await firestore
        .collection("users")
        .doc(userId);
    await userRef.set(
        {
            role: choosenRole
        },
        { merge: true }
    );
}