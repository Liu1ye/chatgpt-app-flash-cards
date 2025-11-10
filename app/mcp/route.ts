import { baseURL } from "@/baseUrl";
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

const getAppsSdkCompatibleHtml = async (baseUrl: string, path: string) => {
  const result = await fetch(`${baseUrl}${path}`);
  return await result.text();
};

type ContentWidget = {
  id: string;
  title: string;
  templateUri: string;
  invoking: string;
  invoked: string;
  html: string;
  description: string;
  widgetDomain: string;
};

function widgetMeta(widget: ContentWidget) {
  return {
    "openai/outputTemplate": widget.templateUri,
    "openai/toolInvocation/invoking": widget.invoking,
    "openai/toolInvocation/invoked": widget.invoked,
    "openai/widgetAccessible": false,
    "openai/resultCanProduceWidget": true,
  } as const;
}

const handler = createMcpHandler(async (server) => {
  const html = await getAppsSdkCompatibleHtml(baseURL, "/");

  const flashCardsWidget: ContentWidget = {
    id: "flash-cards",
    title: "Flash Cards",
    templateUri: "ui://widget/flash-cards-template.html",
    invoking: "Loading flash cards...",
    invoked: "Flash cards loaded",
    html: html,
    description: "Generates flash cards based on the user's input",
    widgetDomain: "https://nextjs.org/docs",
  };
  server.registerResource(
    "flash-cards-widget",
    flashCardsWidget.templateUri,
    {
      title: flashCardsWidget.title,
      description: flashCardsWidget.description,
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": flashCardsWidget.description,
        "openai/widgetPrefersBorder": true,
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${flashCardsWidget.html}</html>`,
          _meta: {
            "openai/widgetDescription": flashCardsWidget.description,
            "openai/widgetPrefersBorder": true,
            "openai/widgetDomain": flashCardsWidget.widgetDomain,
          },
        },
      ],
    })
  );

  server.registerTool(
    flashCardsWidget.id,
    {
      title: flashCardsWidget.title,
      description: `Generate flash cards based on the user's input. You (ChatGPT) should generate the flash cards content including questions and answers`,
      inputSchema: {
        language: z.string().default("en").describe("Language code (ISO 639-1, e.g., 'en', 'zh-CN', 'ja'). Default: en"),
        data: z.object({
          title: z.string().describe("The title of the flash cards"),
          description: z.string().describe("The description of the flash cards"),
          questionNumber: z.number().int().min(1).max(50).default(5).describe("Number of questions to generate"),
          flashCards: z.array(
            z.object({
              question: z.string().describe("The question of the flash card"),
              answer: z.string().describe("The answer of the flash card"),
            })
          ).describe("Array of flash cards")
        }),
      },
      // The widget consumes only these fields as props via useWidgetProps
      outputSchema: {
        language: z.string(),
        data: z.object({
          title: z.string(),
          description: z.string(),
          questionNumber: z.number(),
          flashCards: z.array(
            z.object({
              question: z.string(),
              answer: z.string(),
            })
          ).describe("Array of flash cards. Each flash card should have a question and an answer"),
        }),
      },
      _meta: widgetMeta(flashCardsWidget),
    },
    async (args) => {
      // Return only the fields that the widget needs as structuredContent
      const { language, data } = args;
      const { title, description, questionNumber, flashCards } = data;
      return {
        content: [],
        structuredContent: {
          language,
          data: {
            title,
            description,
            questionNumber,
            flashCards,
          },
        },
      };
    }
  );
});

export const GET = handler;
export const POST = handler;
