# How Models and Migrations Work Together

## Overview

In Sequelize, there are **two ways** to set up database tables:

1. **Models** - Define the structure for your application code (ORM layer)
2. **Migrations** - Actually create/modify tables in the database (database layer)

---

## The Relationship

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   Your Models   │  ────>  │    Migrations    │  ────>  │  Database Tables│
│  (Application)  │         │  (Database DDL)  │         │   (PostgreSQL)  │
└─────────────────┘         └──────────────────┘         └─────────────────┘
```

**Models** = Blueprint for your application
**Migrations** = Instructions to build the actual database
**Tables** = The actual database structure

---

## Side-by-Side Comparison: Count Model vs Migration

### Model (Count.js)
```javascript
const Count = sequelize.define('Count', {
  countId: {
    type: DataTypes.UUID,        // ← Defines type for Sequelize ORM
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  countDate: {
    type: DataTypes.DATEONLY,    // ← Application-level type
    allowNull: false,
    validate: {                  // ← Application validation
      isDate: true
    }
  },
  // ... more fields
}, {
  tableName: 'counts',           // ← Maps to database table name
  timestamps: true               // ← Auto-adds createdAt/updatedAt
});
```

### Migration (create-counts-table.js)
```javascript
async up(queryInterface, Sequelize) {
  await queryInterface.createTable('counts', {  // ← Actually creates table
    countId: {
      type: Sequelize.UUID,       // ← Database-level type
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    countDate: {
      type: Sequelize.DATEONLY,  // ← Database column type
      allowNull: false
      // No validation here - that's in the model
    },
    createdAt: {                 // ← Must be explicit in migration
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  });
}
```

---

## Key Differences

| Aspect | Models | Migrations |
|--------|--------|-----------|
| **Purpose** | Define structure for ORM | Create/modify actual database |
| **When Used** | Runtime (when app runs) | Setup time (when setting up DB) |
| **Validation** | ✅ Has validators | ❌ No validation |
| **Timestamps** | Auto-added if `timestamps: true` | Must be explicitly defined |
| **Relationships** | Can define associations | Must create foreign keys manually |
| **Version Control** | Single file per model | Multiple files (one per change) |

---

## How They Work Together

### Step 1: Define Model
```javascript
// src/models/Count.js
const Count = sequelize.define('Count', {
  countId: { type: DataTypes.UUID, primaryKey: true },
  countDate: { type: DataTypes.DATEONLY, allowNull: false },
  // ...
});
```

### Step 2: Create Migration (based on model)
```javascript
// src/migrations/20251121171453-create-counts-table.js
async up(queryInterface, Sequelize) {
  await queryInterface.createTable('counts', {
    countId: { type: Sequelize.UUID, primaryKey: true },
    countDate: { type: Sequelize.DATEONLY, allowNull: false },
    // ...
  });
}
```

### Step 3: Run Migration
```bash
npm run db:migrate
```
This **actually creates** the table in PostgreSQL.

### Step 4: Use Model in Application
```javascript
// In your controllers/routes
const Count = require('./models/Count');

// Create a record
await Count.create({
  countDate: '2024-11-21',
  serviceType: 'sunday_service',
  vehicleType: 'car',
  location: 'Main Parking',
  countValue: 45
});

// Query records
const counts = await Count.findAll();
```

---

## Two Approaches to Table Creation

### Approach 1: Using `sequelize.sync()` (Development Only)
```javascript
// In database.js
await sequelize.sync({ alter: true });
```
- ✅ Automatically creates tables from models
- ✅ Quick for development
- ❌ Not recommended for production
- ❌ Can't track changes
- ❌ May lose data

### Approach 2: Using Migrations (Recommended)
```bash
# 1. Create migration
npx sequelize-cli migration:generate --name create-counts-table

# 2. Fill in migration file
# 3. Run migration
npm run db:migrate
```
- ✅ Version controlled
- ✅ Trackable changes
- ✅ Safe for production
- ✅ Can rollback changes
- ✅ Team-friendly

---

## Best Practice Workflow

1. **Define Model** → Create `src/models/Count.js`
2. **Create Migration** → Generate migration file
3. **Write Migration** → Match model structure in migration
4. **Run Migration** → `npm run db:migrate` (creates table)
5. **Use Model** → In your application code

---

## Important Notes

### Models Can Have More Than Migrations
- Models can have **validators** (migrations don't)
- Models can have **virtual fields** (not in database)
- Models can have **hooks** (beforeCreate, afterUpdate, etc.)

### Migrations Can Have More Than Models
- Migrations can create **indexes**
- Migrations can create **constraints**
- Migrations can modify **existing tables**

### They Must Stay in Sync!
If you change a model, you should:
1. Create a new migration
2. Update the database schema
3. Keep model and migration aligned

---

## Example: Adding a New Field

### 1. Update Model
```javascript
// src/models/Count.js
const Count = sequelize.define('Count', {
  // ... existing fields
  userId: {
    type: DataTypes.UUID,
    allowNull: true
  }
});
```

### 2. Create Migration
```bash
npx sequelize-cli migration:generate --name add-userId-to-counts
```

### 3. Write Migration
```javascript
async up(queryInterface, Sequelize) {
  await queryInterface.addColumn('counts', 'userId', {
    type: Sequelize.UUID,
    allowNull: true
  });
}

async down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('counts', 'userId');
}
```

### 4. Run Migration
```bash
npm run db:migrate
```

---

## Summary

- **Models** = How your application sees the data
- **Migrations** = How the database stores the data
- **Both** should match in structure
- **Migrations** are the source of truth for database schema
- **Models** are the source of truth for application logic

