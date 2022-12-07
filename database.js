let Database = [
    { id: 1, username: 'Cindy', email: 'cindy123@gmail.com', password: 'cindy123!', reminders: [{id: 1, title: "abc", description: "jay", completed: false, date: "2022-07-19T12:01"}] },
    { id: 2, username: 'Alex', email: 'alex123@gmail.com', password: 'alex123!', reminders: [{id: 1, title: "abc", description: "rock", completed: true,date: "2022-07-19T12:01"},] },
];
const userModel = {
    findOne: (email) => {
        const user = Database.find((user) => user.email === email || user.email == email);
        if (user) {
            return user;
        }
        throw new Error(`Unable to find user with email: ${email}`);
    },
    findById: (id) => {
        const user = Database.find((user) => user.id === id || user.id == id);
        if (user) {
            return user;
        }
        throw new Error(`Unable to find user with id: ${id}`);
    },
    findByGithubId: (id) => {
        const user = Database.find((user) => user.id === id || user.id == id);
        if (user) {
            return user;
        }
        return false;
    },


};
module.exports = {Database,userModel};