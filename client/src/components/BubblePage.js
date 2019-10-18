import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = props => {
	const [colorList, setColorList] = useState([]);

	const fetchColors = () => {
		axiosWithAuth()
			.get("/api/colors")
			.then(res => {
				console.log(res);
				setColorList(res.data);
			});
	};
	// fetch your colors data from the server when the component mounts
	// set that data to the colorList state property

	React.useEffect(() => {
		fetchColors();
	}, []);

	return (
		<>
			<ColorList
				colors={colorList}
				updateColors={setColorList}
				fetchColors={fetchColors}
			/>
			<Bubbles colors={colorList} />
		</>
	);
};

export default BubblePage;
