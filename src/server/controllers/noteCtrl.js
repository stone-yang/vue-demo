import mongoose from 'mongoose';
import noteService from '@server/services/noteService';
import commonService from '@server/services/commonService';

const NoteDetail = mongoose.model('NoteDetail');

/**
 * edit a label which is attached to a note 修改note关联的label
 * @body {String} label - label id
 * @body {Bealoon} isAdd - true: add label  false: remove label
 */
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
