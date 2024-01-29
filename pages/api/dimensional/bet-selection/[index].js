import { pool } from '@/lib/mysql2';

export default async function handler(req, res) {
  const { index, parameter } = req.query;

  console.log(index); // book_risk is the value since [param] dynamic name maps to this value
  console.log(parameter);
  const sql_ = `
    SELECT
      selection,
      COUNT(*) AS NumberOfComponents,
      AVG(component_price) AS AverageComponentPrice,
      SUM(book_risk_component) AS TotalBookRiskComponent,
      SUM(book_profit_gross_component) AS TotalBookProfitComponent,
      SUM(CASE WHEN is_alternate = 1 THEN 1 ELSE 0 END) AS AlternateBets,
      SUM(CASE WHEN is_alternate = 0 THEN 1 ELSE 0 END) AS StandardBets,
      AVG(line) AS AverageLine,
      AVG(prob_norm_at_bet) AS AverageProbability,
      AVG(component_cnt_bet) AS AverageComponentCount
  FROM
      BetComponents
  GROUP BY
      selection
  ORDER BY
      NumberOfComponents DESC;
  `;

  try {
    const [rows, fields] = await pool.query(sql_, [index]); // WHERE column_name = ?

    res.status(200).json({ data: rows });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
}
