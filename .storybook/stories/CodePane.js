import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import CodePane from 'components/CodePane';

const cCode = `#include <stdio.h>

int main() {
  printf("Hello world\\n");
}
`;

const cppCode = `#include <iostream>

using namespace std;

int main() {
  cout << "Hello world\\n" << endl;
}
`;

storiesOf('CodePane', module)
.add('C (props)', () => (
  <CodePane lang='c' code={ cCode } />
))
.add('C (children)', () => (
  <CodePane lang='c'>
    { cCode }
  </CodePane>
))
.add('C++ (prop)', () => (
  <CodePane lang='cpp' code={ cppCode } />
))
.add('C++ (children)', () => (
  <CodePane lang='cpp'>
    { cppCode }
  </CodePane>
));
