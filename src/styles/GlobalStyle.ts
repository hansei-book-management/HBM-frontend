import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}

*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
*{
  box-sizing: border-box;
}
body{
  font-family: 'Source Sans Pro', sans-serif;
}
a {
  text-decoration: none;
  color: inherit; 
}

html,body{

@media screen and (max-width: 2600px) and (min-width: 2000px) {
    font-size: 18px;
};

@media screen and (max-width: 2000px) and (min-width: 1500px) {
    font-size: 16px;
};

@media screen and (max-width: 1500px) and (min-width: 1000px) {
    font-size: 14px;
};

@media screen and (max-width: 1000px) and (min-width: 700px) {
    font-size: 12px;
};

@media screen and (max-width: 700px) and (min-width: 500px) {
    font-size: 10px;
};

@media screen and (max-width: 500px) and (min-width: 300px) {
    font-size: 8px;
};
}

`;
