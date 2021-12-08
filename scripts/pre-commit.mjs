#!/usr/bin/env node

import chalk from 'chalk';
import {execa} from 'execa';

const {stdout: stdoutPrettier} = await execa('prettier', ['--write', '.'], {
  env: {FORCE_COLOR: true},
});

function print(printable) {
  if (printable.trim() === '') {
    return;
  }
  console.log(chalk.bold.blue(`[web3-blog]`) + ' ' + printable);
}

const asciiArray = stdoutPrettier.split('\n');

asciiArray
  .filter(s => !s.startsWith('\x1B[90m'))
  .forEach(file => print(`prettier ${chalk.bold(file)}`));

console.log();
try {
  await execa('eslint', ['--fix', 'src'], {
    stdio: 'inherit',
  });
} catch (e) {
  process.exit(1);
}
