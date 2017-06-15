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
    ref: 'Zone',
    display: false,
  },

  content: {
    code: 'content',
    type: String,
    required: [true, 'Note content is required.'],
  },

  color: {
    code: 'color',
    type: Object,
    ref: 'ExpenseInfo',
  },

  labels: {
    code: 'labels',
    type: Object,
    isArray: true,
    ref: 'Label',
  },
};

export default NoteDetail;
