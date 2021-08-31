import { firestore } from "../firebase/firebase.utils";

export const deleteCategory = async categoryId => {
  const categoryRef = await firestore.collection("categories").doc(categoryId);
  await categoryRef.delete();
};
export const addCategory = async name => {
  const categoriesRef = await firestore.collection("categories");
  categoriesRef.add({
    name
  });
};
export const updateCategory = async (categoryId, name) => {
  const categoryRef = await firestore.collection("categories").doc(categoryId);
  await categoryRef.set(
    {
      name: name
    },
    { merge: true }
  );
};
