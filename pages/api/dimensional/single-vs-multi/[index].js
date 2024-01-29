import { pool } from '@/lib/mysql2';

export default async function handler(req, res) {
  const { index, parameter } = req.query;

  //  curl http://localhost:3000/api/dimensional/line-components/uri?parameter=123
  console.log(index);
  console.log(parameter);

  const sql_ = `
    SELECT
      CASE
          WHEN BC.component_cnt_bet = 1 THEN 'Single Bet'
          WHEN BC.component_cnt_bet > 1 THEN 'Multi Bet'
          ELSE 'Unknown'
      END AS BetType,
      B.bet_type AS BetTypeName,
      COUNT(*) AS TotalBets,
      SUM(B.bet_price) AS TotalBetAmount,
      AVG(B.bet_price) AS AverageBetAmount,
      AVG(B.bet_prob) AS AverageBetProbability,
        AVG(B.book_risk) AS AverageBookRisk
    FROM
        Bets B
    JOIN
        BetComponents BC
    ON
        B.bet_id_swish = BC.bet_id_swish
    GROUP BY
        BetType, BetTypeName
    ORDER BY
      BetType, BetTypeName;
    `;

  try {
    const [rows, fields] = await pool.query(sql_, [index]); // WHERE column_name = ?

    res.status(200).json({ data: rows });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
}
