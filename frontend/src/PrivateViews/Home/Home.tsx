import React from "react";

import Header from "Components/Header";

interface HomeProps {
    removeSession: () => void;
}

const Home = ({ removeSession }: HomeProps): JSX.Element => {
    return (
        <div>
            <Header removeSession={removeSession} />
        </div>
    );
};

export default Home;
