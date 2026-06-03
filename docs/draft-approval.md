# MediSeen Blog Draft Approval

This is the simple review flow for non-technical approvers.

## Review

1. Open `https://blog.mediseenhms.com/drafts`.
2. Enter the review password.
3. Read the draft.
4. If changes are needed, click **Edit** on the draft card.
5. Make the change in GitHub and click **Commit changes**.

## Publish

1. Click **Approve & Publish** on the draft card.
2. The draft filename is copied automatically.
3. GitHub Actions opens.
4. Click **Run workflow**.
5. Paste the draft filename.
6. Click the green **Run workflow** button.

The workflow moves the draft from `content/drafts` to `content/posts`, verifies the blog build, commits the published post, and pushes it.

## Notes

- Drafts are hidden from the public homepage until approved.
- The `/drafts` page is hidden from search engines and normal navigation.
- The password protects the review page from casual visitors. Publishing still uses GitHub Actions so no secret token is exposed in the static website.
- Health-tip posts must stay safe: no herbs, vitamins, or natural solutions should be described as cures.
