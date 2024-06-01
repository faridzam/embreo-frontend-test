import { assetsFetchMock } from '@/__mocks__/fetchMock';
import '@testing-library/jest-dom';

jest.mock("axios");

global.fetch = jest.fn((data: any) =>
  Promise.resolve({
    json: () => Promise.resolve(data),
  })
) as jest.Mock;

beforeEach(() => {
  jest.spyOn(global, "fetch")
  .mockImplementation(assetsFetchMock);
});

afterEach(() => {
  jest.restoreAllMocks();
});