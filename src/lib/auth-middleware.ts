import type { Context, Next } from "hono"
import consola from "consola"

import { state } from "./state"

export async function bearerAuth(c: Context, next: Next) {
  // 如果没有设置 API Token，跳过认证
  if (!state.apiToken) {
    return await next()
  }

  const authorization = c.req.header("Authorization")
  
  if (!authorization) {
    consola.warn("Missing Authorization header")
    return c.json({ error: "Missing Authorization header" }, 401)
  }

  if (!authorization.startsWith("Bearer ")) {
    consola.warn("Invalid Authorization header format")
    return c.json({ error: "Invalid Authorization header format. Expected: Bearer <token>" }, 401)
  }

  const token = authorization.slice(7) // Remove "Bearer " prefix
  
  if (token !== state.apiToken) {
    consola.warn("Invalid API token provided")
    return c.json({ error: "Invalid API token" }, 401)
  }

  consola.debug("API token validated successfully")
  return await next()
} 