import api from "../utils/api"

export const AIchatService = async (message) => {

    const res = await api.post("/ai/chat", { message })
    const { reply, success } = res.data
    return { reply, success }
}