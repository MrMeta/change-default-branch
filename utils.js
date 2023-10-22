const { getOctokit, context } = require('@actions/github');

async function createBranch(targetBranch) {
    const toolkit = getOctokit(githubToken());

    const targetRef = `refs/heads/${targetBranch}`;
    try {
      await toolkit.rest.git.createRef({
        ref: targetRef,
        sha: context.sha,
        ...context.repo,
      })
    } catch (error) {
      if (error.name === 'HttpError' && error.status === 422 && error.response.data.message == 'Reference already exists') {
        return false;
      }
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