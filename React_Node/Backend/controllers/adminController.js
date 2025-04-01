// const db = require('../config/db');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Admin Login Controller Logic

// exports.adminlogin = (req, res) => {

//     const {A_Username, A_PWD } = req.body;
//     // const hashedPassword = bcrypt.hashSync(A_PWD, 10);
//     db.query( 'SELECT * FROM admin WHERE A_Username = ?', [A_Username], (err, result) => {

//         if(err) return res.status(500).send('Server Error');
//         if(result.length ==0) return res.status(401).send('Invalid Username');

//         const admin = result[0];
//         if(!bcrypt.compareSync(A_PWD,admin.A_PWD)) return res.status(401).send('Invalid Password');

//         const token = jwt.sign ({id: admin.A_ID , role: admin.A_Role}, process.env.JWT_SECRET, {expiresIn: '1h'});
//         res.json({token, message: "Login successful"});
        
//     });
// };

// without ES module
// const db = require('../config/db');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// exports.adminlogin = (req, res) => {
//     const { A_Username, A_PWD } = req.body;
//     db.query('SELECT * FROM admin WHERE A_Username = ?', [A_Username], (err, result) => {
//         if (err) return res.status(500).send('Server Error');
//         if (result.length === 0) return res.status(401).send('Invalid Username');

//         const admin = result[0];
//         if (!bcrypt.compareSync(A_PWD, admin.A_PWD)) return res.status(401).send('Invalid Password');

//         const token = jwt.sign({ id: admin.A_ID, role: admin.A_Role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token, message: "Login successful" });
//     });
// };

