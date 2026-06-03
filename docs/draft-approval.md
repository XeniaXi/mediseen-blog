# MediSeen Blog Draft Approval

This is the simple review flow for non-technical approvers.

## Review

1. Open `https://blog.mediseenhms.com/drafts`.
2. Read the draft.
3. If changes are needed, click **Edit** on the draft card.
4. Make the change in GitHub and click **Commit changes**.

## Publish

1. Copy the draft filename shown on the draft card.
2. Click **Approve** on the draft card.
3. Click **Run workflow**.
4. Paste the draft filename.
5. Click the green **Run workflow** button.

The workflow moves the draft from `content/drafts` to `content/posts`, verifies the blog build, commits the published post, and pushes it.

## Notes

- Drafts are hidden from the public homepage until approved.
- The `/drafts` page is hidden from search engines and normal navigation.
- Health-tip posts must stay safe: no herbs, vitamins, or natural solutions should be described as cures.
