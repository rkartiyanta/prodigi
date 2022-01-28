-- reference tables
DROP TABLE IF EXISTS "wishlist";
DROP TABLE IF EXISTS "account";

-- stand alone tables
DROP TABLE IF EXISTS "product";
DROP TABLE IF EXISTS "role";

--
-- Table Schema
--
CREATE TABLE "role" (
	"role" VARCHAR(16) PRIMARY KEY
);

CREATE TABLE "account" (
	"id" 	   SERIAL 	    PRIMARY KEY,
    "name"     VARCHAR(128) NOT NULL,
	"email"    VARCHAR(128) NOT NULL,
	"password" VARCHAR(128) NOT NULL,
    "role"     VARCHAR(16)  NOT NULL,
	CONSTRAINT "fk_role" FOREIGN KEY ("role") REFERENCES "role" ("role") ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE "product" (
	"id"		  SERIAL 	   PRIMARY KEY,
	"name"		  VARCHAR(64)  NOT NULL,
	"description" TEXT         NOT NULL,
	"brand"       VARCHAR(64)  NOT NULL,
	"type"        VARCHAR(64)  NOT NULL,
	"price"       INT 		   NOT NULL,
	"discount"    INT 	       NOT NULL DEFAULT 0, -- in percent
	"image_url"   VARCHAR(128) ARRAY NOT NULL,
    "total_view"  INT          NOT NULL DEFAULT 0,
	"created_at"  TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE "wishlist" (
	"account_id" INT NOT NULL,
	"product_id" INT NOT NULL,
    PRIMARY KEY("account_id", "product_id"),
	CONSTRAINT "fk_account_id" FOREIGN KEY ("account_id") REFERENCES "account" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT "fk_product_id" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);