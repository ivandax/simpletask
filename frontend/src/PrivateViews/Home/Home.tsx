import React from "react";

import Header from "Components/Header";

interface HomeProps {
    session: string;
    removeSession: (session: string) => void;
}

const Home = ({ removeSession, session }: HomeProps): JSX.Element => {
    return (
        <div>
            <Header removeSession={removeSession} session={session} />
        </div>
    );
};

export default Home;
