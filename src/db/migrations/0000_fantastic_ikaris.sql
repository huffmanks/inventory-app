CREATE TABLE "inventoryManager_assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"image_url" text,
	"quantity" integer DEFAULT 1 NOT NULL,
	"serial_number" varchar(50),
	"mac_address" varchar(17),
	"model_number" text,
	"manufacturer" text,
	"manual_pdf_url" text,
	"location_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "inventoryManager_assets_serial_number_unique" UNIQUE("serial_number"),
	CONSTRAINT "inventoryManager_assets_mac_address_unique" UNIQUE("mac_address")
);
--> statement-breakpoint
CREATE TABLE "inventoryManager_barcodes" (
	"id" serial PRIMARY KEY NOT NULL,
	"asset_id" uuid NOT NULL,
	"barcode_type" text,
	"barcode_data" text NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "inventoryManager_barcodes_barcode_data_unique" UNIQUE("barcode_data")
);
--> statement-breakpoint
CREATE TABLE "inventoryManager_locations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inventoryManager_owners" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"name" text NOT NULL,
	"image_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "inventoryManager_owners_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "inventoryManager_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"hashed_password" text DEFAULT 'password' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "inventoryManager_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "inventoryManager_assets" ADD CONSTRAINT "inventoryManager_assets_owner_id_inventoryManager_owners_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."inventoryManager_owners"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventoryManager_assets" ADD CONSTRAINT "inventoryManager_assets_location_id_inventoryManager_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."inventoryManager_locations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventoryManager_barcodes" ADD CONSTRAINT "inventoryManager_barcodes_asset_id_inventoryManager_assets_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."inventoryManager_assets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventoryManager_owners" ADD CONSTRAINT "inventoryManager_owners_user_id_inventoryManager_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."inventoryManager_users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "serial_number_idx" ON "inventoryManager_assets" USING btree ("serial_number");--> statement-breakpoint
CREATE UNIQUE INDEX "mac_address_idx" ON "inventoryManager_assets" USING btree ("mac_address");