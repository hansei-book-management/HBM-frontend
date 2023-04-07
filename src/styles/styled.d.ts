import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    white: string;
    black: string;
    background: string;
    navbar: {
      background: string;
      unselected: string;
      loginButton: string;
    };
    primary: {
      black: string;
      blue: string;
    };
    disable: {
      black: string;
      blue: string;
    };
    time: {
      safe: string;
      danger: string;
    };
  }
}
