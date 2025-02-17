import { relations } from "drizzle-orm";
import { integer, jsonb, pgTableCreator, serial, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";

import { DATABASE_PREFIX } from "@/config/constants";

export const pgTable = pgTableCreator((name: string) => `${DATABASE_PREFIX}_${name}`);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashed_password").default("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const owners = pgTable("owners", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  userId: uuid("user_id")
    .unique()
    .references(() => users.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const locations = pgTable("locations", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const assets = pgTable(
  "assets",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    ownerId: uuid("owner_id")
      .references(() => owners.id, { onDelete: "cascade" })
      .notNull(),
    title: text("title").notNull(),
    description: text("description"),
    imageUrl: text("image_url"),
    quantity: integer("quantity").default(1).notNull(),
    serialNumber: varchar("serial_number", { length: 50 }).unique(),
    macAddress: varchar("mac_address", { length: 17 }).unique(),
    modelNumber: text("model_number"),
    manufacturer: text("manufacturer"),
    manualPdfUrl: text("manual_pdf_url"),
    locationId: uuid("location_id").references(() => locations.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("serial_number_idx").on(table.serialNumber), uniqueIndex("mac_address_idx").on(table.macAddress)]
);

export const barcodes = pgTable("barcodes", {
  id: serial("id").primaryKey(),
  assetId: uuid("asset_id")
    .references(() => assets.id, { onDelete: "cascade" })
    .notNull(),
  barcodeType: text("barcode_type"),
  barcodeData: text("barcode_data").unique().notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const ownersRelations = relations(owners, ({ one, many }) => ({
  user: one(users, {
    fields: [owners.userId],
    references: [users.id],
  }),
  assets: many(assets),
}));

export const assetsRelations = relations(assets, ({ one }) => ({
  owner: one(owners, {
    fields: [assets.ownerId],
    references: [owners.id],
  }),
  location: one(locations, {
    fields: [assets.locationId],
    references: [locations.id],
  }),
}));

export const barcodesRelations = relations(barcodes, ({ one }) => ({
  asset: one(assets, {
    fields: [barcodes.assetId],
    references: [assets.id],
  }),
}));
