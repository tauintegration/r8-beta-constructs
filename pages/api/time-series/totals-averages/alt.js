import { pool } from '@/lib/mysql2';



export default async function handler(req, res) {
  const { index, parameter } = req.query;

  // url http://localhost:3000/api/book_risk?parameter=123
  console.log(index); // book_risk is the value since [param] dynamic name maps to this value
  console.log(parameter);

  const sql_totals_and_averages = `
    SELECT
      DATE_FORMAT(accepted_datetime_utc, '%Y-%m-%d %H:00:00') AS HourOfBet,
      COUNT(*) AS TotalBets,
      SUM(bet_price) AS TotalBetAmount,
      AVG(bet_price) AS AverageBetAmount,
      SUM(COUNT(*)) OVER (ORDER BY DATE_FORMAT(accepted_datetime_utc, '%Y-%m-%d %H:00:00')) AS CumulativeTotalBets,
      SUM(bet_price) OVER (ORDER BY DATE_FORMAT(accepted_datetime_utc, '%Y-%m-%d %H:00:00')) AS CumulativeBetAmount
  FROM
      Bets
  GROUP BY
      HourOfBet
  ORDER BY
      HourOfBet;

  `;

  try {
    const [rows, fields] = await pool.query(sql_totals_and_averages, [index]); // WHERE column_name = ?

    res.status(200).json({ data: rows });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
}
