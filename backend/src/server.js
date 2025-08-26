import { Router } from "express";
const router = Router();

// Exemplo de rota
router.get("/status", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

export default router;
