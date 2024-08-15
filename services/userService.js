const { getDatabase, ref, set } = require('firebase/database');
const bcrypt = require('bcrypt');

 async function userService ({userId, name, email, trade, metro, profilePhoto, password}) {
  console.log({userId, name, email, trade, metro, profilePhoto, password});
 const hashedPassword =  await bcrypt.hash(password, 10);  
     const db = getDatabase();
     try{
       set(ref(db, 'users/' + userId), {
         name: name,
         email: email,
         trade: trade,
         metro: metro,
         password: hashedPassword,
         profilePhoto : profilePhoto
       });
       return;
     } catch(err) {
       return err;
     }
   
   }

module.exports = userService;
 