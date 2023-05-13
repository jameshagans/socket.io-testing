const db = require('../connection');


const getScores = () => {

  
  return db.query(`
  SELECT name as gamertag, score 
  FROM gamers
  ORDER BY score DESC
  limit 20; 
`)
  .then(
    console.log('Received scores')
  );

};


module.exports = { getScores };