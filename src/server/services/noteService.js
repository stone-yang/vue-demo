import mongoose from 'mongoose';

const NoteDetail = mongoose.model('NoteDetail');
const Label = mongoose.model('Label');

async function attachLabel(noteId, labelId, isAdd) {
  if (isAdd) {
    await NoteDetail.updateOne({ _id: noteId }, { $push: { labels: labelId } });
  } else {
    await NoteDetail.updateOne({ _id: noteId }, { $pull: { labels: labelId } });
  }
}

async function attachNote(noteId, labelId, isAdd) {
  if (isAdd) {
    await Label.updateOne({ _id: labelId }, { $push: { notes: noteId } });
  } else {
    await Label.updateOne({ _id: labelId }, { $pull: { notes: noteId } });
  }
}

export default {
  attachLabel,
  attachNote,
};
