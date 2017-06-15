import mongoose from 'mongoose';

const NoteDetail = mongoose.model('NoteDetail');

async function create(note) {
  Object.keys(note).forEach((key) => {
    if (note[key] === '') {
      note[key] = null;
    }
  });
  console.log(note, 111111);
  note.createTime = new Date().getTime();
  const data = await NoteDetail.create(note);
  return data;
}

async function getList(note) {
  const data = await NoteDetail.create(note);
  return data;
}

export default {
  create,
};
