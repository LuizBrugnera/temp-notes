import { Router } from "express";
import textController from "../controller/textController";

const routes = Router();

routes.get("/conotes", textController.find);
routes.get("/conotes/:id", textController.findById);
routes.post("/conotes", textController.create);
routes.put("/conotes/upsert", textController.upsert);
routes.put("/conotes/:id", textController.update);
routes.delete("/conotes/:id", textController.delete);
routes.delete("/conotes/deleteall", textController.deleteAll);

export default routes;
