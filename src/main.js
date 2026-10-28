import { run } from './brainfuck'

import App from './App.bf?raw'

document.getElementById('root').innerHTML = run(App)
