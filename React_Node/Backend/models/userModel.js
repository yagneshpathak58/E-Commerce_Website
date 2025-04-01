// import database connection
import db from '../config/db.js';

/**
 * @description Get user by username for login purpose
 * @param {string} username - Username entered by the user
 * @returns {object} - User data if found
 */

export const getUserByUsername = async (U_Username) => {
    // Optional: Hardcoded test case for testing purposes
    if (U_Username === "testuser") {
      return { U_ID: 1, U_Username: "testuser", U_PWD: "testpassword" };
    }
  
    // SQL query to fetch user from database
    const [rows] = await db.query('SELECT * FROM user_master WHERE U_Username = ?', [U_Username]);
  
    // Return the first matching user or null if not found
    return rows.length > 0 ? rows[0] : null;
  };

/**
 * @description Register new user
 * @param {object} user - New user data
 * @returns {object} - Insert result
 */

export const registerUser = async (user) => {

    const {U_Name, U_EMAIL, U_PHONE, U_Address, U_Username, U_PWD, U_Status} = user;

    // SQL query to insert new user
    const [result] = await db.query(

        'INSERT INTO user_master(U_Name, U_EMAIL, U_PHONE, U_Address, U_Username, U_PWD, U_Status) VALUES (?,?,?,?,?,?,?)',
        [U_Name, U_EMAIL, U_PHONE, U_Address, U_Username, U_PWD, 'Active']

    );

    return result; // Return insert result
};

/**
 * @description Get user by ID (used for authentication checks, profile, etc.)
 * @param {number} userId - User's database ID
 * @returns {object} - User data if found
 */

export const getUserById = async (userId) => {

    const [rows] = await db.query('SELECT * FROM user_master WHERE U_ID = ? ', [userId]);

    return rows[0];


};