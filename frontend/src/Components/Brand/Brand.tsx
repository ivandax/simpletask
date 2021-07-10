import React from "react";

interface BrandProps {
    text: string;
}

const Brand = ({ text }: BrandProps): JSX.Element => {
    return (
        <h3
            style={{ display: "flex", justifyContent: "center", margin: "20px", color: "#000080" }}
        >{`<${text} />`}</h3>
    );
};

export default Brand;
