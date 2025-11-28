import { apiURL } from '@/app/baseURL'

export async function GET() {
  return Response.json({
    authorization_servers: [apiURL + '/oauth/oidc/.well-known/oauth-authorization-server'],
  })
}
