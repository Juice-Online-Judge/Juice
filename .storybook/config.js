import { configure } from '@kadira/storybook';

function loadStories() {
  require('./stories/Submission');
  require('./stories/Pagination');
  require('./stories/CodePane');
  // require as many stories as you need.
}

configure(loadStories, module);
