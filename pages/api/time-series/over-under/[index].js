import { pool } from '@/lib/mysql2';



export default async function handler(req, res) {
  const { index, parameter } = req.query;

  // curl http://localhost:3000/api/time-series/over-under/uri?parameter=123
  console.log(index); // book_risk is the value since [param] dynamic name maps to this value
  console.log(parameter);
  // curl http://localhost:3000/api/time-series/over-under/uri?parameter=123

  const sql_over_under = `
  SELECT
  DATE_FORMAT(B.accepted_datetime_utc, '%Y-%m-%d %H:00:00') AS HourOfBet,
  SUM(CASE WHEN BC.selection = 'over' THEN 1 ELSE 0 END) AS TotalOverBets,
  SUM(CASE WHEN BC.selection = 'under' THEN 1 ELSE 0 END) AS TotalUnderBets
FROM
  Bets B
JOIN
  BetComponents BC ON B.bet_id_swish = BC.bet_id_swish
WHERE
  BC.selection IN ('over', 'under')
GROUP BY
  HourOfBet
ORDER BY
  HourOfBet
  `;

  try {
    const [rows, fields] = await pool.query(sql_over_under, [index]); // WHERE column_name = ?

    res.status(200).json({ data: rows });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
}
