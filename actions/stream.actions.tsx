"use server"

import { currentUser } from "@clerk/nextjs/server"
import { StreamClient, UserRequest } from "@stream-io/node-sdk"

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
const apiSecret = process.env.STREAM_SECRET_KEY
const tokenProvider = async () => {
    const user = await currentUser();
    if (!user) throw new Error('User is not logged in')
    if (!apiKey) throw new Error('No API key')
    if (!apiSecret) throw new Error('No API Secret')
    const newUser: UserRequest = {
        id:user.id,
        role:'user',
        name:user.username || user.id,
        image:user.imageUrl
    }
    const client = new StreamClient(apiKey, apiSecret)
    await client.upsertUsers([])
    const validity = 60 * 60;
    // const exp=Math.round(new Date().getTime()/1000+60*60);
    // const issued=Math.floor(Date.now()/1000-60)
    const token = client.generateUserToken({ user_id: user.id, validity_in_seconds: validity, })
    return token;
}
export default tokenProvider