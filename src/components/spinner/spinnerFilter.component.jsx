import React from "react";

import "./spinner.style.scss";

const SpinnerFilter = Wrapped => props => {
    const { isLoaded, ...otp } = props;
    const btmc=(<div className="content">
                 <div className="line"></div>
                 <div className="line"></div>
                 <div className="line"></div>
                </div>)

    return isLoaded ? (
        <Wrapped {...otp} />
    ) : (
            <div className="filter-spinner">
                <div className="top">
                    <div className="title"></div>
                </div>

            </div>
        );
};

export default SpinnerFilter;