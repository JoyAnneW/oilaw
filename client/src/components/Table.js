import React from "react";

export default function Table({ caption, tableHeadings, tableRows }) {
	return (
		<table className="mx-auto">
			<caption className="text-base">{caption}</caption>
			<thead>
				<tr>{tableHeadings}</tr>
			</thead>
			<tbody>{tableRows}</tbody>
		</table>
	);
}
