-- CreateEnum
CREATE TYPE "Stage" AS ENUM ('awake', 'out', 'light', 'deep');

-- CreateTable
CREATE TABLE "SleepSession" (
    "id" SERIAL NOT NULL,
    "ts" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SleepSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleepStage" (
    "id" SERIAL NOT NULL,
    "stage" "Stage" NOT NULL DEFAULT 'awake',
    "duration" INTEGER NOT NULL,
    "sleepSessionId" INTEGER NOT NULL,

    CONSTRAINT "SleepStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeSeries" (
    "id" SERIAL NOT NULL,
    "tnt" JSONB NOT NULL,
    "tempRoomC" JSONB NOT NULL,
    "tempBedC" JSONB NOT NULL,
    "respiratoryRate" JSONB NOT NULL,
    "heartRate" JSONB NOT NULL,
    "heating" JSONB NOT NULL,
    "sleepSessionId" INTEGER NOT NULL,

    CONSTRAINT "TimeSeries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TimeSeries_sleepSessionId_key" ON "TimeSeries"("sleepSessionId");

-- AddForeignKey
ALTER TABLE "SleepSession" ADD CONSTRAINT "SleepSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleepStage" ADD CONSTRAINT "SleepStage_sleepSessionId_fkey" FOREIGN KEY ("sleepSessionId") REFERENCES "SleepSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSeries" ADD CONSTRAINT "TimeSeries_sleepSessionId_fkey" FOREIGN KEY ("sleepSessionId") REFERENCES "SleepSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
