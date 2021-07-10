import React from "react";

import Header from "Components/Header";

interface HomeProps {
    session: string;
}

const Home = ({ session }: HomeProps): JSX.Element => {
    return (
        <div>
            <Header session={session} />
        </div>
    );
};

export default Home;
