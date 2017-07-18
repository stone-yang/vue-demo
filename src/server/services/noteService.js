import mongoose from 'mongoose';

const NoteDetail = mongoose.model('NoteDetail');
const Label = mongoose.model('Label');
const ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * attach label to a note
 * @param {String} noteId - note id
 * @param {String} labelId - label id
 * @param {Bealoon} isAdd - true: add label  false: remove label
 */
async function attachLabel(noteId, labelId, isAdd) {
  if (isAdd) {
    await NoteDetail.updateOne({ _id: noteId }, { $push: { labels: labelId } });
  } else {
    await NoteDetail.updateOne({ _id: noteId }, { $pull: { labels: labelId } });
  }
}

/**
 * attach note to a label
 * @param {String} noteId - note id
 * @param {String} labelId - label id
 * @param {Bealoon} isAdd - true: add label  false: remove label
 */
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
