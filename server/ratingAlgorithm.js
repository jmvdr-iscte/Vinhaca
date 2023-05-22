const mysql = require("mysql2/promise");

// create the connection pool
const pool = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "vinhaca",
});
// execute the query
async function getNumRatingsPerWine() {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute(`
            SELECT
            v.IDVinho AS IDVinho,
            COUNT(*) AS num_ratings
          FROM 
            vinho v
            JOIN review r ON v.IDVinho = r.IDVinho
          GROUP BY 
            v.IDVinho
      `);
    connection.release();
    return rows;
  } catch (err) {
    console.error(err);
  }
}
async function getAverageRatingsPerWine() {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute(`
          SELECT 
           IDVinho,
            AVG(reviewRating) AS avg_rating
          FROM 
            review
          GROUP BY 
          IDVinho;
        `);
    connection.release();
    return rows;
  } catch (err) {
    console.error(err);
  }
}

async function getWeightedAverageRatingsPerWine() {
  try {
    const numRatingsPerWine = await getNumRatingsPerWine();
    const avgRatingsPerWine = await getAverageRatingsPerWine();

    const weightedAvgRatingsPerWine = numRatingsPerWine.map((numRating) => {
      const avgRating = avgRatingsPerWine.find(
        (avgRating) => avgRating.IDVinho === numRating.IDVinho
      );
      const weightedAvgRating =
        0.4 * numRating.num_ratings + 0.6 * avgRating.avg_rating;
      return {
        IDVinho: numRating.IDVinho,
        weighted_avg_rating: weightedAvgRating,
      };
    });
    console.log(weightedAvgRatingsPerWine);
    return weightedAvgRatingsPerWine;
  } catch (err) {
    console.error(err);
  }
}
async function updateWineWeightedAverageRatings() {
  try {
    const weightedAvgRatingsPerWine = await getWeightedAverageRatingsPerWine();
    const connection = await pool.getConnection();
    for (const weightedAvgRating of weightedAvgRatingsPerWine) {
      const [rows, fields] = await connection.execute(
        `
        UPDATE vinho
        SET Rating = ?
        WHERE IDVinho = ?
      `,
        [weightedAvgRating.weighted_avg_rating, weightedAvgRating.IDVinho]
      );
      console.log(
        `Updated ${rows.affectedRows} rows for wine ID ${weightedAvgRating.IDVinho} and rating is${weightedAvgRating.weighted_avg_rating}`
      );
    }
    connection.release();
  } catch (err) {
    console.error(err);
  }
}

module.exports = updateWineWeightedAverageRatings;
