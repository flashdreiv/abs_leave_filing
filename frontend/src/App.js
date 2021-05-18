import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';

import { useSelector } from 'react-redux';

const App = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  let user = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo;
  const routing = useRoutes(routes(user));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
