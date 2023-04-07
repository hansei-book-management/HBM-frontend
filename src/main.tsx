import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { color } from 'framer-motion';

import App from './App';
import { GlobalStyle } from './styles/global';

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <RecoilRoot>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={color}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </RecoilRoot>,
);
