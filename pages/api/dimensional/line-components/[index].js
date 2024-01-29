import { pool } from '@/lib/mysql2';

export default async function handler(req, res) {
  const { index, parameter } = req.query;

  console.log(index);
  console.log(parameter);

  const sql_ = `
  SELECT line, COUNT(*) AS NumberOfComponents, AVG(component_price) AS AverageComponentPrice, SUM(book_risk_component) AS TotalBookRiskComponent FROM BetComponents GROUP BY line ORDER BY BetComponents.line ASC;
  `;

  try {
    const [rows, fields] = await pool.query(sql_, [index]); // WHERE column_name = ?

    res.status(200).json({ data: rows });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
}
