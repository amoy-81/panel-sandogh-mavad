export const sumfilesSize = (arrayDocs, objectDocs) => {
  let totalSize = 0;
  Object.keys(arrayDocs).map((key) => {
    if (arrayDocs[key] !== null) {
      arrayDocs[key].map((item) => {
        totalSize += item.file.size;
      });
    }
  });
  Object.keys(objectDocs).map((key) => {
    if (objectDocs[key] !== null) {
      totalSize += objectDocs[key].size;
    }
  });

  //   change unit
  const sizeToKb = totalSize / 1000;
  const sizeToMb = totalSize / 1000000;
  if (sizeToMb < 1) {
    return { size: sizeToKb.toFixed(2), unit: "کیلوبایت" };
  } else {
    return { size: sizeToMb.toFixed(2), unit: "مگابایت" };
  }
};

export const lengthFilesCheck = (docs) => {
  let rightLength = true;
  Object.keys(docs).map((key) => {
    if (docs[key] !== null && docs[key].length > 3) {
      rightLength = false;
    }
  });

  return rightLength;
};
