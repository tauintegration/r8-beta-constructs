import mysql from 'mysql2';
import { pool } from './mysql2config.js';

import axios from 'axios';



async function logTotalBetRiskByHourOfDay() {
    let sql = `
        SELECT 
            HOUR(B.accepted_datetime_utc) AS HourOfDay, 
            SUM(B.book_risk) AS TotalBetRisk
        FROM Bets B
        GROUP BY HourOfDay
        ORDER BY HourOfDay;
    `;

    try {
        const [rows, fields] = await pool.query(sql);
        console.log('logTotalBetRiskByHourOfDay:', rows);
    } catch (err) {
        console.error('Error:', err);
    }
}

// Call the function
logTotalBetRiskByHourOfDay();








async function getBetRiskByHourOfDay() {
    let sql = `
        SELECT 
            HOUR(B.accepted_datetime_utc) AS HourOfDay, 
            SUM(B.book_risk) AS TotalBetRisk
        FROM Bets B
        GROUP BY HourOfDay
        ORDER BY HourOfDay;
    `;

    try {
        const [rows, fields] = await pool.query(sql);
        console.log('getBetRiskByHourOfDay:', rows);
        return rows;
    } catch (err) {
        throw err;
    }
}


getBetRiskByHourOfDay();


async function logBetsByDayType() {
    let sql = `
        SELECT 
            CASE
                WHEN DAYOFWEEK(B.accepted_datetime_utc) IN (1, 7) THEN 'Weekend'
                ELSE 'Weekday'
            END AS DayType,
            COUNT(*) AS NumberOfBets
        FROM Bets B
        GROUP BY DayType
        ORDER BY DayType;
    `;

    try {
        const [rows, fields] = await pool.query(sql);
        console.log('logBetsByDayType:', rows);
    } catch (err) {
        console.error('Error:', err);
    }
}

// Call the function
logBetsByDayType();


async function logBetsByDayOfMonth() {
    let sql = `
        SELECT 
            DAY(B.accepted_datetime_utc) AS DayOfMonth, 
            COUNT(*) AS NumberOfBets
        FROM Bets B
        GROUP BY DayOfMonth
        ORDER BY DayOfMonth;
    `;

    try {
        const [rows, fields] = await pool.query(sql);
        console.log('logBetsByDayOfMonth:', rows);
    } catch (err) {
        console.error('Error:', err);
    }
}

// Call the function
logBetsByDayOfMonth();








/// pool.end();
///
