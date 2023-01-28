import { z } from 'zod'
import WebPush from 'web-push'
import { FastifyInstance } from 'fastify'

const publicKey = 'BK7MveJJCbo5LXrLeqNyZ5rtca0-ikLbH0CiBpaRdV1Y_wBqHUrDnH55Rv7VuoTMFkn5n_VBjbHAhAt-o57d5-s'
const privateKey = 'AueZ1so_nOqiGSSt-6PuMpN4vC4ToZ6M5-S4PPXHPlw'

WebPush.setVapidDetails(
  'http://localhost:3333',
  publicKey,
  privateKey
)

export async function notificationsRoutes(app: FastifyInstance) {
  app.get('/push/public_key', () => {
    return {
      publicKey
    }
  })

  app.post('/push/register', (request, reply) => {
    console.log(request.body);

    return reply.status(201).send()
  })

  app.post('/push/send', async (request, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          auth: z.string(),
          p256dh: z.string()
        })
      })
    })

    const { subscription } = sendPushBody.parse(request.body)

    setTimeout(() => {
      WebPush.sendNotification(subscription, 'Hello do backend')
    }, 5000);

    return reply.status(201).send()
  })
}
