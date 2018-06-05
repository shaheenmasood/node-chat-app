const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.userMap.set('1', {id: '1', name: 'Mike', room: 'Node Course'});
    users.userMap.set('2', {id: '2', name: 'Jen', room: 'React Course'});
    users.userMap.set('3', {id: '3', name: 'Julie', room: 'Node Course'});
  });

  it('should add a new user', () => {
    const users = new Users();
    const aUser = {id: '123', name: 'Andrew', room: 'Test'};
    const resUser = users.addUser(aUser.id, aUser.name, aUser.room);
    expect(users.userMap.get(aUser.id)).toEqual(aUser);
  });

  it('should return user names for Node Course', () => {
    expect(users.getUserList('Node Course')).toEqual(['Mike', 'Julie']);
  });

  it('should return user names for React Course', () => {
    expect(users.getUserList('React Course')).toEqual(['Jen']);
  });

  it('should remove a user', () => {
    const removedUser = users.removeUser('1');
    expect(removedUser.name).toBe('Mike');
    expect(users.userMap.size).toBe(2);
  });

  it('should not remove a user', () => {
    const removedUser = users.removeUser('5');
    expect(users.userMap.size).toBe(3);
  });

  it('should find a user', () => {
    expect(users.findUser('1').name).toBe('Mike');
  });

  it('should not find a user', () => {
    expect(users.findUser('5')).toBeFalsy();
  });
});
