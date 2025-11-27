import { ContentWidget, widgetMeta } from '@/app/mcp/tools/types'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

const registerGetFlashCardsTool = async (server: McpServer, html: string) => {
  const flashCardsListWidget: ContentWidget = {
    id: 'flash-cards-list',
    title: 'Flash Cards List',
    templateUri: 'ui://widget/flash-cards-list-template.html',
    invoking: '',
    invoked: '',
    html: html,
    description: "display use's flash cards list",
    widgetDomain: 'https://sider.ai',
  }

  server.registerResource(
    'flash-cards-widget',
    flashCardsListWidget.templateUri,
    {
      title: flashCardsListWidget.title,
      description: flashCardsListWidget.description,
      mimeType: 'text/html+skybridge',
      _meta: {
        'openai/widgetDescription': flashCardsListWidget.description,
        'openai/widgetPrefersBorder': true,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: 'text/html+skybridge',
          text: `<html>${flashCardsListWidget.html}</html>`,
          _meta: {
            'openai/widgetDescription': flashCardsListWidget.description,
            'openai/widgetPrefersBorder': true,
            'openai/widgetDomain': flashCardsListWidget.widgetDomain,
          },
        },
      ],
    })
  )

  server.registerTool(
    flashCardsListWidget.id,
    {
      title: flashCardsListWidget.title,
      description: `
          **When to use**:
        - User asks: "Show me my saved flash cards"
        - User asks: "Display my flash cards"
        - User asks: "Load the flash cards I saved"
        - User asks: "Show my flash cards history" 
        you can call the tool`,
      inputSchema: {},
      outputSchema: {},
      _meta: widgetMeta(flashCardsListWidget),
    },
    async (data, extra) => {
      return {
        content: [],
        structuredContent: {
          type: 'flash-cards-list',
        },
      }
    }
  )
}

export { registerGetFlashCardsTool }
