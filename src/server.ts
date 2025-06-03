import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"

import { bearerAuth } from "./lib/auth-middleware"
import { completionRoutes } from "./routes/chat-completions/route"
import { embeddingRoutes } from "./routes/embeddings/route"
import { modelRoutes } from "./routes/models/route"

export const server = new Hono()

server.use(logger())
server.use(cors())

server.get("/", (c) => c.text("Server running"))

// 应用 Bearer Token 认证中间件到所有 API 路由
server.use("/chat/completions", bearerAuth)
server.use("/models", bearerAuth)
server.use("/embeddings", bearerAuth)
server.use("/v1/chat/completions", bearerAuth)
server.use("/v1/models", bearerAuth)
server.use("/v1/embeddings", bearerAuth)

server.route("/chat/completions", completionRoutes)
server.route("/models", modelRoutes)
server.route("/embeddings", embeddingRoutes)

// Compatibility with tools that expect v1/ prefix
server.route("/v1/chat/completions", completionRoutes)
server.route("/v1/models", modelRoutes)
server.route("/v1/embeddings", embeddingRoutes)
