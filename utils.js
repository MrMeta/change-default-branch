const { getOctokit, context } = require('@actions/github');

async function createBranch(baseBranch, targetBranch) {
  const toolkit = getOctokit(githubToken());

  try {
    const res = await toolkit.rest.git.getRef({
      ref: `heads/${baseBranch}`,
      ...context.repo,
    });

    await toolkit.rest.git.createRef({
      ref: `refs/heads/${targetBranch}`,
      sha: res.data.object.sha,
      ...context.repo,
    })
  } catch (error) {
    if (error.name === 'HttpError' && error.status === 422 && error.response.data.message == 'Reference already exists') {
      return false;
    }
    console.log(error);
    throw Error(error);
  }
  return true;
}

async function changeDefaultBranch(targetBranch) {
  const toolkit = getOctokit(githubToken());

  await toolkit.rest.repos.update({
    ...context.repo,
    default_branch: targetBranch,
  });
}

function githubToken() {
    const token = process.env.GITHUB_TOKEN;
    if (!token) throw ReferenceError('No token defined in the environment variables');
    return token;
}

module.exports = { createBranch, changeDefaultBranch };