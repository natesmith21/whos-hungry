import React from "react";

const Error = ({ error }) => {

    return (
        <section>
            <h2>Error:</h2>

            <ul>
                <li>
                    Error Code: {error.status}
                </li>
                <li>
                    Error: {error.statusText}
                </li>
            </ul>
        </section>
    )
}

export default Error;