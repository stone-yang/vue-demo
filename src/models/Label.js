/**
 * detailed information of a note
 * @type {Object}
 */
const Label = {
  id: {
    code: 'id',
    type: Object,
  },

  title: {
    code: 'title',
    type: String,
  },

  notes: {
    code: 'notes',
    type: Object,
    isArray: true,
    ref: 'NoteDetail',
  },

  createTime: {
    code: 'createTime',
    type: Date,
  },
};

export default Label;
