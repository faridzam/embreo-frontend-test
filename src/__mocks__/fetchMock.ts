global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  })
) as jest.Mock

export const assetsFetchMock = (data: any) =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: async () => data,
  } as Response)
