import { pool } from '@/lib/mysql2';

export default async function handler(req, res) {
  const { index, parameter } = req.query;

  // url http://localhost:3000/api/book_risk?parameter=123
  console.log(index); // book_risk is the value since [param] dynamic name maps to this value
  console.log(parameter);

  const sql = `
    SELECT
      HOUR(B.accepted_datetime_utc) AS HourOfDay,
      SUM(B.book_risk) AS TotalBetRisk
    FROM Bets B
    GROUP BY HourOfDay
    ORDER BY HourOfDay;
  `;

  try {
    const [rows, fields] = await pool.query(sql, [index]); // WHERE column_name = ?

    res.status(200).json({ data: rows });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
}
