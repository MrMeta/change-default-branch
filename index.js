const core = require('@actions/core');
const github = require('@actions/github');

try {
  const targetBranch = core.getInput('target-branch');
  console.log(`Hello ${targetBranch}!`);
  core.setOutput("is-created", true);
} catch (error) {
  core.setFailed(error.message);
}
