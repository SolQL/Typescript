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


const repoName = process.argv[2];
if(repoName === undefined) {
    console.error('Please enter your target directory. (npx solql <TARGET_DIR>)');
    process.exit(1);
}

const gitClone = `git clone https://github.com/SolQL/solql-workspace ${repoName}`;
const installDeps = `cd ${repoName} && npm i`;
const removeOrigin = `cd ${repoName} && git remote rm origin`;

console.log(`Cloning the repository...`);
const cloned = runCommand(gitClone);
if(!cloned) process.exit(1);

console.log('Installing dependencies...');
const installed = runCommand(installDeps);
if(!installed)process.exit(1);


console.log('Removing remote origin...');
const originRemoved = runCommand(removeOrigin);
if(!originRemoved) process.exit(1);


console.log('Successfully installed SolQL!')

