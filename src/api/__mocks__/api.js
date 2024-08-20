
  export const submitAPI = jest.fn(() => true);

  export const fetchAPI = jest.fn().mockImplementation(() => {

    return Promise.resolve(['12:00', '12:30', '01:00', '01:30', '02:00']);
  });
