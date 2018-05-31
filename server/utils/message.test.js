const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'shah';
    const text = 'testing';
    const res = generateMessage(from, text);
    expect(res).toMatchObject({
        from,
        text
    });
    expect(typeof res.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location message object', () => {
    const from = 'shah';
    const latitude = 37.3050626;
    const longitude = -122.00872989999999;
    const res = generateLocationMessage(from, latitude, longitude);
    expect(res).toMatchObject({
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`
    });
    expect(typeof res.createdAt).toBe('number');
  });
});
