import React from "react";

export default function Table({
	caption,
	tableHeadings,
	tableRows,
	captionStyles,
}) {
	return (
		<table className="w-full border-separate">
			<caption className={captionStyles}>{caption}</caption>
			<thead className="text-sm">
				<tr>{tableHeadings}</tr>
			</thead>
			<tbody>{tableRows}</tbody>
		</table>
	);
}
