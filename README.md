# change-default-branch

## Inputs

### `target-branch`

**Required** The name of target branch

- If this branch doesn't exist, this action will create new branch based from triggered sha.
- And then this action set target branch as default branch

## Outputs

### `is-created`

Whether target branch is created or not

## Example usage

```yaml
uses: MrMeta/change-default-branch@v0.1
with:
  target-branch: 'target-branch'
```

## Trivia

- If error is occurred after target branch is created, target branch will not be removed.