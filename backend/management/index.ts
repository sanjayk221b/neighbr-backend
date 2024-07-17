import app from "./src/infrastructure/config/app"

const PORT = process.env.PORT || 4002;

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`)
);
