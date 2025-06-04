import { Hono } from 'hono'
import { serve } from '@hono/node-server'

const app = new Hono()

app.get('/', (c) => c.text('Pomotomo API'))

serve({ fetch: app.fetch, port: 3000 })
