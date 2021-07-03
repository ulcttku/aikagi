# Aikagi

![version](https://img.shields.io/npm/v/aikagi)
![license](https://img.shields.io/npm/l/aikagi)

Aikagi converts the key of the object and then also converts the type.

## Usage

### SnakeCase to CamelCase

```TypeScript
import * as aikagi from 'aikagi';

const response = {
    title: 'Aikagi is a useful library!',
    content: 'Aikagi means duplicate key in Japanese.',
    comments: [
        {
            content: 'LGTM',
            create_by: {
                user_id: 'comment_user_1',
            },
        },
        {
            content: 'Good',
            create_by: {
                user_id: 'comment_user_2',
            },
        }
    ],
    create_by: {
        user_id: 'author',
        last_name: 'Alpha',
        first_name: 'Bravo',
    },
    created_at: '2021/02/01 00:00:00',
    updated_at: '2021/02/01 00:00:00',
};

// const obj: {
//     title: string;
//     content: string;
//     comments: {
//         content: string;
//         createBy: {
//             userId: string;
//         };
//     }[];
//     createBy: {
//         userId: string;
//         lastName: string;
//         firstName: string;
//     };
//     createdAt: string;
//     updatedAt: string;
// }
const obj = aikagi.camelCase(response);
```

### CamelCase to SnakeCase

```TypeScript
import * as aikagi from 'aikagi';

const response = {
    title: 'Aikagi is a useful library!!!',
    content: 'Aikagi converts the key of the object.',
    isDraft: true,
    createBy: {
        userId: 'author',
        lastName: 'Alpha',
        firstName: 'Bravo',
    },
};

// const obj: {
//     title: string;
//     content: string;
//     is_draft: boolean;
//     create_by: {
//         user_id: string;
//         last_name: string;
//         first_name: string;
//     };
// }
const obj = aikagi.snakeCase(response);
```
