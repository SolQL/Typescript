#!/usr/bin/env node

const { execSync } = require("child_process");


const runCommand = (command) => {
    try {
        execSync(`${command}`, { stdio: 'inherit'});
    }
    catch(error) {
        console.error(`Failed to execute ${command}`);
        return false;
    }

    return true;
}


const gitClone = `git clone https://github.com/SolQL/Typescript`;
const installDeps = `npm i`;

console.log(`Cloning the repository...`);
const cloned = runCommand(gitClone);
if(!cloned) process.exit(1);

console.log('Installing dependencies...');
const installed = runCommand(installDeps);
if(!installed)process.exit(1);


console.log('Successfully installed SolQL!')

