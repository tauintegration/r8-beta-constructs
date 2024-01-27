import fse from 'fs-extra';
import fs from 'fs';

import mysql from 'mysql2';
import { pool } from './mysql2config.js';

import streamJson from 'stream-json';
import StreamArray from 'stream-json/streamers/StreamArray.js';
import { extractBetData, extractComponentData, extractEventData, extractPlayerData } from './datafn.js';

const { parser } = streamJson;

const filePath = './bet_data_fe_assessment.json';


const pprocessRecord = async (record, pool) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const betData = extractBetData(record);
        await connection.query('INSERT INTO Bets SET ?', [betData]);

        const componentData = extractComponentData(record);
        await connection.query('INSERT INTO BetComponents SET ?', [componentData]);

        const eventData = extractEventData(record);
        await connection.query('INSERT INTO Events SET ?', [eventData]);

        const playerData = extractPlayerData(record);
        await connection.query('INSERT INTO Players SET ?', [playerData]);

        await connection.commit();
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        throw error;
    } finally {
        if (connection) {
            await connection.release();
        }
    }
};



const processRecord = async (record, pool) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Check and insert for Bets
        const [existingBet] = await connection.query('SELECT 1 FROM Bets WHERE bet_id_swish = ?', [record.bet_id_swish]);
        if (existingBet.length === 0) {
            const betData = extractBetData(record);
            await connection.query('INSERT INTO Bets SET ?', [betData]);
        }

        // Check and insert for BetComponents
        const [existingComponent] = await connection.query('SELECT 1 FROM BetComponents WHERE component_id_swish = ?', [record.component_id_swish]);
        if (existingComponent.length === 0) {
            const componentData = extractComponentData(record);
            await connection.query('INSERT INTO BetComponents SET ?', [componentData]);
        }

        // Check and insert for Events
        const [existingEvent] = await connection.query('SELECT 1 FROM Events WHERE event_id = ?', [record.event_id]);
        if (existingEvent.length === 0) {
            const eventData = extractEventData(record);
            await connection.query('INSERT INTO Events SET ?', [eventData]);
        }

        // Check and insert for Players
        const [existingPlayer] = await connection.query('SELECT 1 FROM Players WHERE player_id = ?', [record.player_id]);
        if (existingPlayer.length === 0) {
            const playerData = extractPlayerData(record);
            await connection.query('INSERT INTO Players SET ?', [playerData]);
        }

        await connection.commit();
    } catch (error) {
        console.error('Error in processRecord:', error);
        if (connection) {
            await connection.rollback();
        }
    } finally {
        if (connection) {
            await connection.release();
        }
    }
};



const jsonStream = fs.createReadStream(filePath)
    .pipe(parser())
    .pipe(new StreamArray());

jsonStream.on('data', ({ value }) => {
    processRecord(value, pool);
});

jsonStream.on('end', () => {
    console.log('Finished processing data');
});

jsonStream.on('error', (error) => {
    console.error('Error processing data:', error);
});
