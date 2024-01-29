import mysql from 'mysql2/promise';

var a2_mysql_h="mi3-ts13.a2hosting.com";
var a2_mysql_d="fronten2_bet_market";
var a2_mysql_u="fronten2_demo_user_24";
var a2_mysql_p="expiresin30days";


export const pool = mysql.createPool({
  host: a2_mysql_h,
  user: a2_mysql_u,
  database: a2_mysql_d,
  password: a2_mysql_p,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
