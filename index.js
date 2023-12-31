const core = require('@actions/core');
const { createBranch, changeDefaultBranch } = require('./utils');

async function main() {
  try {
    const baseBranch = core.getInput('base-branch');
    const targetBranch = core.getInput('target-branch');
    if (!baseBranch || !targetBranch) {
      return core.setFailed(`Branches are required. (baseBranch: ${baseBranch}, targetBranch: ${targetBranch}`);
    }

    const isCreated = await createBranch(baseBranch, targetBranch);
    if (!isCreated) {
      console.log(`${targetBranch} already exists.`);
    } else {
      console.log(`${targetBranch} is created.`);
    }
    core.setOutput("is-created", isCreated);
    await changeDefaultBranch(targetBranch);
    console.log(`Default branch is ${targetBranch} now.`)
  } catch (error) {
    core.setFailed(error.message);
  }
}
main();