import { Request, Response } from "express";
import { db } from "../db/tempDb";

const infoCheck = (info: any, errorMessage: string) => {
  if (!info) {
    throw new Error(errorMessage);
  }
};

const textController = {
  async create(req: Request, res: Response) {
    try {
      const { id, text } = req.body;

      infoCheck(id, "id is required");
      infoCheck(text, "text is required");

      const result = db.findById(id);
      infoCheck(!result, "id already exists");

      const note = {
        id,
        text,
      };

      await db.create(note);
      res.status(201).json(note);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
  async findById(req: Request, res: Response) {
    try {
      const text = await db.findById(req.params.id);
      infoCheck(text, "id not found");
      res.status(200).json(text);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  },
  async find(req: Request, res: Response) {
    try {
      const texts = await db.find();
      res.status(200).json(texts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async update(req: Request, res: Response) {
    try {
      const { id, text } = req.body;
      infoCheck(id, "id is required");
      infoCheck(text, "text is required");
      await db.update(req.params.id, { id, text });
      res.status(200).json({ id, text });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const text = await db.findById(req.params.id);
      infoCheck(text, "id not found");
      await db.delete(req.params.id);
      res.status(200).json();
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  },
  async deleteAll(req: Request, res: Response) {
    try {
      await db.deleteAll();
      res.status(200).json();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async upsert(req: Request, res: Response) {
    try {
      const { id, text } = req.body;
      infoCheck(id, "id is required");
      infoCheck(text, "text is required");
      await db.upsert(id, { id, text });
      res.status(200).json({ id, text });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};
export default textController;
