# Database Schema Overview

This document outlines the database structure used in the Advanced Initiative Tracker project.

## Tables

### `encounter`
- **Purpose**: Manages individual game sessions.
- **Key Columns**: `id`, `name`, `is_public`, `created_at`, `user_id`.

### `stat_block`
- **Purpose**: Stores reusable character attributes.
- **Key Columns**: `id`, `name`, `dexterity`, `hit_points_average`, `armor_class`.

### `participant`
- **Purpose**: Tracks characters participating in an encounter.
- **Key Columns**: `id`, `encounter_id`, `stat_block_id`, `name`, `initiative`.

### `combat_log`
- **Purpose**: Logs actions and statuses during an encounter.
- **Key Columns**: `id`, `encounter_id`, `turn_no`, `hit_points_current`.

### `profiles`
- **Purpose**: Stores user information.
- **Key Columns**: `id`, `full_name`, `username`, `avatar_url`.
