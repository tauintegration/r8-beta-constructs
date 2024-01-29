import { pool } from '@/lib/mysql2';

export default async function handler(req, res) {
  const { index, parameter } = req.query;

  //  curl http://localhost:3000/api/dimensional/line-components/uri?parameter=123
  console.log(index);
  console.log(parameter);
  const sql_ = `
  SELECT HOUR(accepted_datetime_utc) AS HourOfDay, AVG(bet_price) AS AverageBetPrice FROM Bets WHERE bet_price BETWEEN -10000 AND 100000 GROUP BY HourOfDay;
  `;

  try {
    const [rows, fields] = await pool.query(sql_, [index]); // WHERE column_name = ?

    res.status(200).json({ data: rows });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
}
