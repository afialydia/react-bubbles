import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const NewColor = ({ updateColors }) => {
    const [newColor, setNewColor] = useState({
        color: "",
        code: ""
    });

    const handleChanges = e => {
        setNewColor({
            ...newColor,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
            .post("api/colors", newColor)
            .then(res => {
                console.log("color added", res);
                updateColors(res.data);
            })
            .catch(err => console.log("Didn't work: ", err));
    };

    return (
        <div className="new-color-form">
            <form onSubmit={handleSubmit}>
                <input type="text" name="color" value={newColor.color} onChange={handleChanges} placeholder="Color Name" />
                <input type="text" name="code" value={newColor.code} onChange={handleChanges} placeholder="Color Code" />
                <button type="submit">Add Color</button>
            </form>
        </div>
    );
};

export default NewColor