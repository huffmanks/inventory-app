import { assets, barcodes, locations, owners, users } from "@/db/schema";

export type UserSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

export type OwnerSelect = typeof owners.$inferSelect;
export type OwnerInsert = typeof owners.$inferInsert;

export type LocationSelect = typeof locations.$inferSelect;
export type LocationInsert = typeof locations.$inferInsert;

export type AssetSelect = typeof assets.$inferSelect;
export type AssetInsert = typeof assets.$inferInsert;

export type BarcodeSelect = typeof barcodes.$inferSelect;
export type BarcodeInsert = typeof barcodes.$inferInsert;

export type LoggedInUser = {
  id: string;
  name: string;
  email: string;
  imageUrl: string | undefined;
  initials: string;
};
