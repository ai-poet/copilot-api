import { getModels } from "~/services/copilot/get-models"

import { state } from "./state"


export async function cacheModels(): Promise<void> {
  const models = await getModels()
  state.models = models
}
