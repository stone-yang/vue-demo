import mongoose from 'mongoose';
import noteService from '@server/services/noteService';
import commonCtrl from '@server/controllers/commonCtrl';

const NoteDetail = mongoose.model('NoteDetail');

async function createNote(ctx, next) {
  const note = ctx.request.body;
  const data = await noteService.create(note);
  ctx.body = data;
  await next();
}

async function removeNote(ctx, next) {
  const res = await commonCtrl.remove(NoteDetail, ctx);
  ctx.body = res;
  await next();
}

async function getAll(ctx, next) {
  const res = await commonCtrl.getList(NoteDetail, ctx);
  ctx.body = res;
  await next();
}

export default {
  createNote,
  getAll,
  removeNote,
};
