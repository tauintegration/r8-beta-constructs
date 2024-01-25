import mysql from 'mysql2';
import { pool } from './mysql2config.js';

import axios from 'axios';



async function logBetsByDayOfWeek() {
    let sql = `
        SELECT 
            DAYNAME(B.accepted_datetime_utc) AS DayOfWeek, 
            COUNT(*) AS NumberOfBets
        FROM Bets B
        GROUP BY DayOfWeek
        ORDER BY FIELD(DayOfWeek, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
    `;

    try {
        const [rows, fields] = await pool.query(sql);
        console.log('Results:', rows);
    } catch (err) {
        console.error('Error:', err);
    }
}

// Call the function
logBetsByDayOfWeek();

/// pool.end();
///
