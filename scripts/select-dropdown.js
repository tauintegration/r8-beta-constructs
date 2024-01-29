import mysql from 'mysql2';
import { pool } from './mysql2config.js';

async function logBetsBySelectionAndLine() {
    let sql = `
        SELECT BC.selection, BC.line, COUNT(*) AS NumberOfBets
        FROM BetComponents BC
        GROUP BY BC.selection, BC.line
        ORDER BY BC.selection, BC.line;
    `;

    try {
        const [rows, fields] = await pool.query(sql);
        console.log('Results:', rows);
    } catch (err) {
        console.error('Error:', err);
    }
}

// Call the function
logBetsBySelectionAndLine();
