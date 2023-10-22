const core = require('@actions/core');
const { createBranch, changeDefaultBranch } = require('./utils');

async function main() {
  try {
    const targetBranch = core.getInput('target-branch');
    const isCreated = await createBranch(targetBranch);
    if (!isCreated) {
      console.log(`${targetBranch} already exists`)
    }
    core.setOutput("is-created", isCreated);
    await changeDefaultBranch(targetBranch);
  } catch (error) {
    core.setFailed(error.message);
  }
}
main();