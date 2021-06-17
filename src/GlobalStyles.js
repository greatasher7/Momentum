import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    html{
        font-size: 1vw;
        letter-spacing: .05rem;
    }
    a{
        text-decoration: none;
        color: inherit;
    }
    *, *::before, *::after{
        box-sizing: border-box;
    }
    body{
        background-color: #111;
        color: white;
    }
`;
 
export default GlobalStyles;