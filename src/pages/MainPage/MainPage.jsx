import React from "react";

import IntroPage from "./IntroPage/IntroPage";
import AutroPage from "./AutroPage/AutroPage";

const MainPage = (props) => {
    return(
        <div>
            <IntroPage />
            <AutroPage />
        </div>
    );
}

export default MainPage;