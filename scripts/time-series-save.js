import mysql from 'mysql2';
import { pool } from './mysql2config.js';
import path from 'path';
import fs from 'fs';

async function saveBetStatisticsByHourOfDayAsJson() {
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
        const jsonData = JSON.stringify(rows, null, 2);
        const filePath = 'BetStatisticsByHourOfDay.json';
        fs.writeFileSync(filePath, jsonData);
        console.log('JSON file saved:', filePath);
    } catch (err) {
        console.error('Error:', err);
    }
}

// Call the function
saveBetStatisticsByHourOfDayAsJson();
