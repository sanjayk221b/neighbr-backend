import app from "@/infrastructure/config/app";

const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(`[ SERVICE :: AUTH SERVICE] AUTH service is listening on http://localhost:${PORT}`)
);