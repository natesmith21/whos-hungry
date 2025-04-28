import React from "react";
import {Spinner} from 'reactstrap'

const LoadingPage = () => (
    <section>
        <Spinner>
            Lozading...
        </Spinner>
        <p>Loading...</p>
    </section>
);

export default LoadingPage;