import { t } from 'elysia'

export const HealthSchema = {
  detail: {
    tags: ['Health'],
    summary: 'Check server health',
    description: 'Returns a simple response to indicate the server is running.',
    responses: {
      200: {
        description: 'Server is healthy',
        content: {
          'application/json': {
            schema: t.Object({
              success: t.Boolean({ example: true }),
              message: t.String({ example: 'Welcome to the API!' }),
              data: t.Any({ example: null }),
            }),
          },
        },
      },
    },
  },
}
