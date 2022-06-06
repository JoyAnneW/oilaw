import React from "react";

export default function Table({
	caption,
	tableHeadings,
	tableRows,
	captionStyles,
	lawyerTableFontSize = "",
}) {
	return (
		<table className={`w-full border-separate ${lawyerTableFontSize}`}>
			<caption className={`text-base font-bold mb-2 ${captionStyles}`}>
				{caption}
			</caption>
			<thead className="text-sm">
				<tr>{tableHeadings}</tr>
			</thead>
			<tbody>{tableRows}</tbody>
		</table>
	);
}
