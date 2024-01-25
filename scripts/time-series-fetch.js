import mysql from 'mysql2';
import { pool } from './mysql2config.js';

import axios from 'axios';


async function logBetStatisticsByHourOfDay() {
    let sql = `
        SELECT 
            HOUR(B.accepted_datetime_utc) AS HourOfDay, 
            COUNT(*) AS NumberOfBets, 
            AVG(B.bet_price) AS AverageBetPrice, 
            SUM(B.book_risk) AS TotalBetRisk, 
            SUM(B.bet_prob) AS TotalBetProbability, 
            COUNT(DISTINCT B.client_id) AS DistinctClients, 
            SUM(CASE WHEN B.is_inplay = 1 THEN 1 ELSE 0 END) AS InPlayBets, 
            COUNT(DISTINCT B.country_id) AS DistinctCountries 
        FROM Bets B 
        GROUP BY HourOfDay 
        ORDER BY HourOfDay;
    `;

    try {
        const [rows, fields] = await pool.query(sql);
        console.log('Results:', rows);
    } catch (err) {
        console.error('Error:', err);
    }
}

// Call the function
logBetStatisticsByHourOfDay();




/*

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


*/





/// pool.end();
///
