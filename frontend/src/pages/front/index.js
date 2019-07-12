import Loadable from '../../components/Loadable';

export default {
  exact: false,
  auth: false,
  path: '/',
  component: Loadable({
    loader: () => import('./front'),
  }),
};
