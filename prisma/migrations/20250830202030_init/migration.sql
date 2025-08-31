-- CreateEnum
CREATE TYPE "public"."CalcMethod" AS ENUM ('MWL', 'UmmAlQura', 'ISNA', 'Egyptian', 'Karachi', 'Dubai', 'Qatar', 'Kuwait', 'Moonsighting', 'Turkey');

-- CreateEnum
CREATE TYPE "public"."Madhab" AS ENUM ('Shafi', 'Hanafi');

-- CreateEnum
CREATE TYPE "public"."HighLatRule" AS ENUM ('MiddleOfTheNight', 'SeventhOfTheNight', 'TwilightAngle');

-- CreateEnum
CREATE TYPE "public"."LatAdjMethod" AS ENUM ('MiddleOfTheNight', 'AngleBased', 'OneSeventh');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "refreshToken" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Prefs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "calcMethod" "public"."CalcMethod" NOT NULL DEFAULT 'MWL',
    "madhab" "public"."Madhab" NOT NULL DEFAULT 'Shafi',
    "highLatRule" "public"."HighLatRule" NOT NULL DEFAULT 'MiddleOfTheNight',
    "latitudeAdjustment" "public"."LatAdjMethod" NOT NULL DEFAULT 'MiddleOfTheNight',
    "useMoonsighting" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Prefs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Location" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "timezone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Prefs_userId_key" ON "public"."Prefs"("userId");

-- AddForeignKey
ALTER TABLE "public"."Prefs" ADD CONSTRAINT "Prefs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Location" ADD CONSTRAINT "Location_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
