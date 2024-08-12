import app from "@/infrastructure/config/app"

const PORT = process.env.PORT;

app.listen(PORT, () =>
  `[ SERVICE :: MANAGEMENT SERVICE ] is listening on http://localhost:${PORT}`
);
