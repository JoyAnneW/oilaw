const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const loginRouter = require("./routes/login");
const adminRouter = require("./routes/admin.js");
const lawyersRouter = require("./routes/lawyers");
const requestersRouter = require("./routes/requesters");
const assignmentsRouter = require("./routes/assignments");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", function (req, res, next) {
	res.send("Access the API at path /api");
});

app.use("/api/login", loginRouter);
app.use("/api/admin", adminRouter);
app.use("/api/requesters", requestersRouter);
app.use("/api/lawyers", lawyersRouter);
app.use("/api/assignments", assignmentsRouter);

// app.use( express.static('public') );

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
// 	next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
// 	// set locals, only providing error in development
// 	res.locals.message = err.message;
// 	res.locals.error = req.app.get("env") === "development" ? err : {};

// 	// render the error page
// 	res.status(err.status || 500);
// 	res.send("error");
// });

app.use((req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});
module.exports = app;
