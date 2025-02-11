import { t } from 'elysia'

export const ListSchema = {
  detail: {
    tags: ['Members'],
    summary: 'Get List All Members',
    description: 'Fetch paginated all members with status active',
    responses: {
      200: {
        description: 'All members listed',
        content: {
          'application/json': {
            schema: t.Object({
              success: t.Boolean({ example: true }),
              message: t.String({ example: 'success' }),
              data: t.Array(
                t.Object({
                  uuid: t.String({ example: 'xxxx-xxx-xxx-xxx-xxxx' }),
                  internal_id: t.String({ example: 'A98F40TQUU' }),
                  email: t.String({ example: 'abc@abc.com' }),
                  fullname: t.String({ example: 'Abc Def' }),
                  nickname: t.String({ example: 'Abc' }),
                  created_at: t.String({ example: '2025-02-10T11:08:11.448Z' }),
                })
              ),
            }),
          },
        },
      },
    },
  },
}

export const CreateSchema = {
  detail: {
    tags: ['Members'],
    summary: 'Post Create New Member',
    description: 'Register new member',
  },
}

export const UpdateSchema = {
  detail: {
    tags: ['Members'],
    summary: 'Put Update Existing Member',
    description: 'Update partial member`s fields',
  },
}

export const DeleteSchema = {
  detail: {
    tags: ['Members'],
    summary: 'Delete Existing Member',
    description: 'Soft delete an member data',
  },
}
