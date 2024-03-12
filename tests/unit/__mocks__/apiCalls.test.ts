const mockKlinesResponse= [
    [ 1807.81, 1809.99, 1550, 1681.49 ],
    [ 1681.49, 1699.4, 1641.02, 1661.59 ],
    [ 1661.6, 1683.92, 1654.31, 1682.6 ]
  ]

const mockApiCall = {
  klines: jest.fn(() => Promise.resolve(mockKlinesResponse)),
};
describe('blank', () => {
  test('blank test', async () => {
    expect(true).toBe(true)
  });
});

export default mockApiCall;