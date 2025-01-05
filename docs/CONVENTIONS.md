# Project Conventions

## Branching

- Use descriptive branch names to keep the workflow organized.  
  - **Feature:** `feature/<feature-name>`  
    Example: `feature/header`
  - **Bug fix:** `fix/<issue-or-bug>`  
    Example: `fix/login-page`
  - **Documentation:** `docs/<update>`  
    Example: `docs/update-readme`

## Commit Messages

- Follow the structure: `type(scope): message`.  
  - **Types:**
    - `feat`: New features
    - `fix`: Bug fixes
    - `docs`: Documentation updates
    - `chore`: Minor changes (e.g., configs, formatting)
    - `test`: Testing-related changes
  - **Examples:**
    - `feat(header): add profile menu`
    - `fix(login): resolve sign-in bug`
- Reference issues with `#<issue-number>`:  
  - Example: `fix(header): resolve sign-out bug (#41)`
- Commit small, incremental changes frequently for better version control.

## Pull Requests

- All pull requests must be reviewed and approved before merging.  
- Use draft pull requests for work-in-progress.  
- Link related issues in the pull request description:  
  - Example: `Closes #10`

## Issues

- Create an issue for every feature, bug fix, or significant change.  
- Assign relevant labels and milestones.  
- Use clear, concise titles and descriptions.

## Code Formatting

- Use Prettier for consistent code style.  
- Run `npx prettier --check .` before committing to catch formatting issues.

## Documentation

- Store all project-related documentation in the `docs/` folder.  
- Ensure documentation is accurate and up to date.
