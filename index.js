const core = require('@actions/core');
const { createBranch } = require('./utils');

async function main() {
  try {
    const targetBranch = core.getInput('target-branch');
    console.log(`Hello ${targetBranch}!`);
    core.setOutput("is-created", await createBranch(targetBranch));
  } catch (error) {
    core.setFailed(error.message);
  }
}
main();