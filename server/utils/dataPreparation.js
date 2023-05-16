function fixBullshit(dataMedition) {
    let updatedMeditions = [];
    for (let i = 0; i < dataMedition.length; i++) {
      const { x, y } = dataMedition[i];
      const updatedObject = { x: x - 1, y };
      updatedMeditions.push(updatedObject);
    }
    return updatedMeditions;
  }
  module.exports = fixBullshit;
