// typically middleware don't take arguments, which is why we need to return a fn that takes the normal middleware arguments to be able to use this.
const checkRole = (permissions) => {
	return (req, res, next) => {
		const { role } = req.user;
		// if the array with all permissions that we pass in a request includes the role sent with req.user, then move on with the request.
		if (permissions.includes(role)) {
			next();
		} else {
			return res
				.status(403)
				.send("You are not authorized to access this resource.");
		}
	};
};

module.exports = checkRole;
