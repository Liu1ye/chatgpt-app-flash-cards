import { ContentWidget, widgetMeta } from '@/app/mcp/tools/types'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

const registerFlashCardsGeneratorTool = async (server: McpServer, html: string) => {
  const flashCardsWidget: ContentWidget = {
    id: 'flash-cards',
    title: 'Flash Cards',
    templateUri: 'ui://widget/flash-cards-template.html',
    invoking: 'Loading flash cards...',
    invoked: 'Flash cards loaded',
    html: html,
    description: "Generates flash cards based on the user's input",
    widgetDomain: 'https://sider.ai',
  }

  server.registerResource(
    'flash-cards-widget',
    flashCardsWidget.templateUri,
    {
      title: flashCardsWidget.title,
      description: flashCardsWidget.description,
      mimeType: 'text/html+skybridge',
      _meta: {
        'openai/widgetDescription': flashCardsWidget.description,
        'openai/widgetPrefersBorder': true,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: 'text/html+skybridge',
          text: `<html>${flashCardsWidget.html}</html>`,
          _meta: {
            'openai/widgetDescription': flashCardsWidget.description,
            'openai/widgetPrefersBorder': true,
            'openai/widgetDomain': flashCardsWidget.widgetDomain,
          },
        },
      ],
    })
  )

  server.registerTool(
    flashCardsWidget.id,
    {
      title: flashCardsWidget.title,
      description: `Generate flash cards based on the user's input. You (ChatGPT) should generate the flash cards content including questions and answers`,
      inputSchema: {
        language: z
          .string()
          .default('en')
          .describe("Language code (ISO 639-1, e.g., 'en', 'zh-CN', 'ja'). Default: en"),
        data: z.object({
          title: z.string().describe('The title of the flash cards'),
          description: z.string().describe('The description of the flash cards'),
          flashCards: z
            .array(
              z.object({
                id: z.string().describe('The id of the flash card'),
                question: z.string().describe('The question of the flash card'),
                answer: z.string().describe('The answer of the flash card'),
              })
            )
            .describe('Array of flash cards'),
        }),
      },
      // The widget consumes only these fields as props via useWidgetProps
      outputSchema: {
        language: z.string(),
        data: z.object({
          title: z.string(),
          description: z.string(),
          flashCards: z
            .array(
              z.object({
                id: z.string(),
                question: z.string(),
                answer: z.string(),
              })
            )
            .describe('Array of flash cards. Each flash card should have a question and an answer'),
        }),
      },
      _meta: widgetMeta(flashCardsWidget),
    },
    async ({ language, data }, extra) => {
      const token = extra?.authInfo?.token
      const { title, description, flashCards } = data
      return {
        content: [],
        structuredContent: {
          language,
          type: 'flash-cards',
          data: {
            title,
            description,
            flashCards,
          },
        },
      }
    }
  )
}

export { registerFlashCardsGeneratorTool }
