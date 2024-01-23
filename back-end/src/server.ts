import routes from "./api/routes/routes";
import app from "./app";

app.use("/api/v1", routes);
const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
