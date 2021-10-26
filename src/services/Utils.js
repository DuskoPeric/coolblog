import { firestore } from "../firebase/firebase.utils";

export const timestampConvertor = time => {
  const d = new Date(time * 1000);
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "numeric" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

  return `${da}.${mo}.${ye}`;
};

export const getDataList = async path => {
  const dataRef = await firestore.collection(path);
  const snapshot = await dataRef.get();
  let data = [];
  snapshot.forEach(doc => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
};

export const sortData=(data,prop)=>{
  const sortedData = data.sort(function(a, b) {
    return new Date(b[prop].seconds * 1000) - new Date(a[prop].seconds * 1000);
  });
  return sortedData;
}
