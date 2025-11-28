import { createMcpHandler, withMcpAuth } from 'mcp-handler'
import verifyToken from '../lib/verifyToken'
import {
  registerFetchTool,
  registerGetFlashCardsTool,
  registerFlashCardsGeneratorTool,
} from './tools'
import { baseURL } from '../baseURL'

const getAppsSdkCompatibleHtml = async (baseUrl: string, path: string) => {
  const result = await fetch(`${baseUrl}${path}`)
  return await result.text()
}

const handler = createMcpHandler(async (server) => {
  const html = await getAppsSdkCompatibleHtml(baseURL, '/')

  await registerFlashCardsGeneratorTool(server, html)
  await registerGetFlashCardsTool(server, html)
  await registerFetchTool(server)
})

const authHandler = withMcpAuth(handler, verifyToken, {
  required: true,
  requiredScopes: ['read:stuff'],
  resourceMetadataPath: '/.well-known/oauth-protected-resource',
})

export const GET = authHandler
export const POST = authHandler
