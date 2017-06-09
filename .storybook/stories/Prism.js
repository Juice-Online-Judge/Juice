import React from 'react'
import {storiesOf} from '@storybook/react'
import Prism from 'components/Prism'

const cCode = `#include <stdio.h>

int main() {
  printf("Hello world\\n");
}
`

const cppCode = `#include <iostream>

using namespace std;

int main() {
  cout << "Hello world\\n" << endl;
}
`

storiesOf('Prism', module)
  .add('C (props)', () => <Prism lang='c' code={cCode} />)
  .add('C (children)', () =>
    <Prism lang='c'>
      {cCode}
    </Prism>
  )
  .add('C++ (prop)', () => <Prism lang='cpp' code={cppCode} />)
  .add('C++ (children)', () =>
    <Prism lang='cpp'>
      {cppCode}
    </Prism>
  )
