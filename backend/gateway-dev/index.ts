import express, { Application, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import proxy from "express-http-proxy";
import { config } from "dotenv";

config();
const app: Application = express();
const PORT: number = Number(process.env.PORT);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// CORS setup
const allowedOrigins = [process.env.CLIENT_URL!];
const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Other middleware
app.use(cookieParser());

// Services
const services = {
  auth: process.env.AUTH_SERVICE_URL as string,
  notification: process.env.NOTIFICATION_SERVICE_URL as string,
  management: process.env.MANAGEMENT_SERVICE_URL as string,
  communication: process.env.COMMUNICATION_SERVICE_URL as string,
  community: process.env.COMMUNITY_SERVICE_URL as string,
};

// Routes to proxy
const routes = [
  {
    context: "/api/auth",
    target: services.auth,
    changeOrigin: true,
  },
  {
    context: "/api/notification",
    target: services.notification,
    changeOrigin: true,
  },
  {
    context: "/api/management",
    target: services.management,
    changeOrigin: true,
  },
  {
    context: "/api/communication",
    target: services.communication,
    changeOrigin: true,
  },
  {
    context: "/api/v1/community",
    target: services.community,
    changeOrigin: true,
  },
];

// Proxy setup for routes
routes.forEach((route) => {
  if (typeof route.target === "string") {
    app.use(route.context, (req, res, next) => {
      const parseReqBody = !req.is("multipart/form-data");
      proxy(route.target, {
        proxyReqPathResolver: (req) => {
          const newPath = req.baseUrl + req.url;
          console.log(
            `[Gateway] Redirecting: ${req.method} ${req.url} -> ${route.target}${newPath}`
          );
          return newPath;
        },
        parseReqBody: parseReqBody,
      })(req, res, next);
    });
  } else {
    console.warn(`Proxy target for ${route.context} is undefined.`);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(
    `[ SERVICE :: API GATEWAY ] API Gateway is listening on http://localhost:${PORT}`
  );
});
