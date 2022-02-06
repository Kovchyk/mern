module.exports = {
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/testroute',
    search: '',
    hash: '',
    state: { from: '' },
  }),
  useHistory: () => ({ push: jest.fn() }),
  useParams: jest.fn(),
};
