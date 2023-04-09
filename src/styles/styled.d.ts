import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    white: string;
    black: string;
    background: string;
    navbar: {
      background: string;
      unselected: string;
      selected: string;
      loginButton: string;
    };
    primary: {
      black: string;
      blue: string;
      white: string;
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
