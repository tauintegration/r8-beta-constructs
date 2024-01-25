import mysql from 'mysql2';
import { pool } from './mysql2config.js';

import axios from 'axios';


async function logComponentCountsByRiskRange() {
    let sql = `
        SELECT 
            CASE 
                WHEN BC.book_risk_component < 5 THEN '<5'
                WHEN BC.book_risk_component BETWEEN 5 AND 10 THEN '5-10'
                -- Add more ranges as needed
                ELSE '10+' 
            END AS RiskComponentRange, 
            COUNT(*) AS NumberOfComponents
        FROM BetComponents BC
        GROUP BY RiskComponentRange
        ORDER BY RiskComponentRange;
    `;

    try {
        const [rows, fields] = await pool.query(sql);
        console.log('Results:', rows);
    } catch (err) {
        console.error('Error:', err);
    }
}

// Call the function
logComponentCountsByRiskRange();



/// pool.end();
///
