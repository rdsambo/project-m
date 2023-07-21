import { createAsyncThunk } from '@reduxjs/toolkit';
import checkEnvironment from '@/util/check-environment';
import buildEmail from '@/util/templent';

const host = checkEnvironment();

export const fetchUserById = createAsyncThunk('users/fetchUser', async (userId) => {
  const response = await fetch(`${host}/api/users/${userId}`);
  const responseInjson = await response.json();

  return responseInjson;
});

type Notification = {
  _id: string;
  title?: string;
  description?: string;
  columnId?: string;
  assignedTo?: string;
  sequence?: number;
};

export const userAssignToCardNotification = createAsyncThunk(
  'users/assignToCardNotification',
  async (task: Notification) => {
    const { _id, assignedTo, title } = task;
    const response = await fetch(`${host}/api/users/${assignedTo}`);
    const user = await response.json();

    const email = user.email;
    const name = user.fullName;
    const subject = `Ola, ${name}`;
    const content = `Você foi atribuído a um cartão com título: ${title}`;

    const link = `${host}/boards/${_id}`;

    const body = buildEmail(link, subject, content, 'Acessar o quadro');

    await fetch(`${host}/api/notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, name, subject, body })
    });
  }
);
// export const userUpdateCardNotification = createAsyncThunk('users/updateCardNotification', async (obj) => {
// });
//
// export const userAddCommentNotification = createAsyncThunk('users/addCommentNotification', async (obj) => {
// });
//
// export const userDeleteCommentNotification = createAsyncThunk('users/deleteCommentNotification', async (obj) => {
// });
