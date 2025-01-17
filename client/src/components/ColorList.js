import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import NewColor from './newColor'

const initialColor = {
	color: "",
	code: { hex: "" }
};

const ColorList = ({ colors, updateColors, fetchColors }, props) => {
	// console.log(colors);
	const [editing, setEditing] = useState(false);
	const [colorToEdit, setColorToEdit] = useState(initialColor);

	const editColor = color => {
		setEditing(true);
		setColorToEdit(color);
	};

	const saveEdit = e => {
		e.preventDefault();
		console.log(colorToEdit);
		axiosWithAuth()
			.put(`/api/colors/${colorToEdit.id}`, { ...colorToEdit })
			.then(res => {
				console.log(res);
				fetchColors(res);
			})

			.catch(err => console.log(err.response));
		// Make a put request to save your updated color
		// think about where will you get the id from...
		// where is is saved right now?
	};

	const deleteColor = color => {
		// make a delete request to delete this color
		axiosWithAuth()
			.delete(`/api/colors/${color.id}`)
			.then(res => {
				// console.log(res);
				fetchColors(res);
			})
			.catch(err => console.log(err.response));
	};


	return (
		<div className="colors-wrap">
			<p>colors</p>
			<ul>
				{colors.map(color => (
					<li key={color.color} onClick={() => editColor(color)}>
						<span>
							<span className="delete" onClick={() => deleteColor(color)}>
								x
							</span>{" "}
							{color.color}
						</span>
						<div
							className="color-box"
							style={{ backgroundColor: color.code.hex }}
						/>
					</li>
				))}
			</ul>
			{editing && (
				<form onSubmit={saveEdit}>
					<legend>edit color</legend>
					<label>
						color name:
						<input
							onChange={e =>
								setColorToEdit({ ...colorToEdit, color: e.target.value })
							}
							value={colorToEdit.color}
						/>
					</label>
					<label>
						hex code:
						<input
							onChange={e =>
								setColorToEdit({
									...colorToEdit,
									code: { hex: e.target.value }
								})
							}
							value={colorToEdit.code.hex}
						/>
					</label>
					<div className="button-row">
						<button type="submit">save</button>
						<button onClick={() => setEditing(false)}>cancel</button>
					</div>
				</form>
			)}		
			
			<NewColor updateColors={updateColors}/>

			<div className="spacer" />
			
		</div>
	);
};

export default ColorList;
