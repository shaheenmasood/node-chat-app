class Users {
  constructor () {
    this.userMap = new Map();
  }

  addUser(id, name, room) {
    const aUser = {id, name, room};
    this.userMap.set(id, aUser);
    return aUser;
  }

  removeUser(id) {
    const aUser = this.userMap.get(id);
    if (aUser) {
      this.userMap.delete(id);
    }
    return aUser;
  }

  findUser(id) {
    return this.userMap.get(id);
  }

  getUserList(room) {
    let values =[ ...this.userMap.values() ];
    const users = values.filter(a => a.room === room);
    return users.map(a => a.name);
  }
}

module.exports = {Users};
