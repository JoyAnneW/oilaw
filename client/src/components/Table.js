import React from "react";

export default function Table({ caption, tableHeadings, tableRows, array }) {
	return (
		<table className="mx-auto">
			<caption className="text-base">{caption}</caption>
			<thead>
				<tr>{tableHeadings}</tr>
			</thead>
			<tbody>{tableRows(array)}</tbody>
		</table>
	);
}
