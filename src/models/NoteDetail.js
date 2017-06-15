/**
 * detailed information of a note
 * @type {Object}
 */
const NoteDetail = {
  id: {
    code: 'id',
    type: Object,
  },

  title: {
    code: 'title',
    type: String,
  },

  content: {
    code: 'content',
    type: String,
    // required: [true, 'Note content is required.'],
  },

  color: {
    code: 'color',
    type: Object,
    // ref: 'ExpenseInfo',
  },

  labels: {
    code: 'labels',
    type: Object,
    isArray: true,
    // ref: 'Label',
  },

  createTime: {
    code: 'createTime',
    type: Date,
  },
};

export default NoteDetail;
