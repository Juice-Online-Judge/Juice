import { configure } from '@kadira/storybook';

function loadStories() {
  require('./stories/Submission');
  require('./stories/Pagination');
  require('./stories/Prism');
  require('./stories/TitleCard');
  require('./stories/ExamCard');
  require('./stories/ExamBasicInfoTab');
  require('./stories/MarkdownEditor');
}

configure(loadStories, module);
