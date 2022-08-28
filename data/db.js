const fs = require('fs');
const path = require('path'); 

const loadUsers = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname,'users.json'),'utf-8'));
};

const storeUsers = (users) => {
    fs.writeFileSync(path.join(__dirname, 'users.json'),JSON.stringify(users,null,3),'utf-8');    
};

module.exports = {
    loadUsers,
    storeUsers
}