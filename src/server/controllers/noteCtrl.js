import mongoose from 'mongoose';
import noteService from '@server/services/noteService';
import commonService from '@server/services/commonService';

const NoteDetail = mongoose.model('NoteDetail');

async function editLabel(ctx, next) {
  const noteId = ctx.params.id;
  const labelId = ctx.request.body.label;
  const isAdd = ctx.request.body.isAdd;
  await noteService.attachLabel(noteId, labelId, isAdd);
  await noteService.attachNote(noteId, labelId, isAdd);
  const data = await commonService.getList('NoteDetail', { _id: noteId }, null, null, 'labels');
  ctx.body = { success: true, data };
  await next();
}

export default {
  editLabel,
};
