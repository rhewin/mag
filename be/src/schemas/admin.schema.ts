import { t } from 'elysia'

export const ListSchema = {
  detail: {
    tags: ['Admins'],
    summary: 'Get List All Admins',
    description: 'Fetches paginated all admins with status active',
    responses: {
      200: {
        description: 'All admins listed',
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

export const LoginSchema = {
  detail: {
    tags: ['Admins'],
    summary: 'Post Login Admin',
    description: 'Login admin to get token',
  },
}

export const CreateSchema = {
  detail: {
    tags: ['Admins'],
    summary: 'Post Create New Admin',
    description: 'Register new admin',
  },
}

export const UpdateSchema = {
  detail: {
    tags: ['Admins'],
    summary: 'Put Update Existing Admin',
    description: 'Update partial admin`s fields',
  },
}

export const DeleteSchema = {
  detail: {
    tags: ['Admins'],
    summary: 'Delete Existing Admin',
    description: 'Soft delete an admin data',
  },
}
