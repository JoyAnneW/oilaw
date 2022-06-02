const caseTableHeadings = [
	"ID",
	"Name",
	"Description",
	"Contact By",
	"Status",
	"Received",
].map((heading) => <th>{heading}</th>);

const caseTableRows = (caseData) => {
	return caseData.map((issue) => {
		return (
			<tr key={issue.id}>
				<td>{issue.id}</td>
				<td>
					{issue.first_name} {issue.last_name}
				</td>
				<td> {issue.description}</td>
				<td>{issue.contact_pref}</td>
				<td>Conditional Rendering Based on State</td>
			</tr>
		);
	});
};

const lawyerTableHeadings = ["ID", "Name", "Specialty", "Available"].map(
	(heading) => <th>{heading}</th>
);

const lawyerTableRows = (array, state, stateSetter) => {
	return array.map((lawyer) => {
		return (
			<tr key={lawyer.id}>
				<td>{lawyer.id}</td>
				<td>
					{lawyer.first_name} {lawyer.last_name}
				</td>
				<td>{lawyer.specialty}</td>
				<td>{lawyer.available}</td>
			</tr>
		);
	});
};

export {
	caseTableHeadings,
	caseTableRows,
	lawyerTableHeadings,
	lawyerTableRows,
};
