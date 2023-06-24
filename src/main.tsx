import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { BrowserRouter } from 'react-router-dom';

import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import App from './App';
import { GlobalStyle } from './styles/global';
import { colors } from './styles';

if (typeof window !== 'undefined') {
  injectStyle();
}

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <RecoilRoot>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={colors}>
          <GlobalStyle />
          <App />
          <ToastContainer />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </RecoilRoot>,
);
