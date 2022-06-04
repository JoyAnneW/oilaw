const caseTableHeadings = [
	"ID",
	"Name",
	"Description",
	"Contact By",
	"Status",
	"Received",
].map((heading) => <th>{heading}</th>);

const lawyerTableHeadings = [
	"ID",
	"Name",
	"Specialty",
	"Available",
	"Contact Details",
].map((heading) => <th>{heading}</th>);

const allAssignmentHeadings = [
	"Lawyer ID",
	"Lawyer Name",
	"Case ID",
	"Client Name",
].map((heading) => <th>{heading}</th>);
export { caseTableHeadings, lawyerTableHeadings, allAssignmentHeadings };
