-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('EMAIL_VERIFICATION', 'PASSWORD_RESET');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('Belum Menikah', 'Menikah', 'Cerai');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('PEMASUKAN', 'PENGELUARAN');

-- CreateEnum
CREATE TYPE "BenefitType" AS ENUM ('RAWAT_INAP', 'RAWAT_JALAN', 'BERSALIN', 'KESEHATAN_GIGI');

-- CreateEnum
CREATE TYPE "ProgramType" AS ENUM ('DOCTER_FEE', 'ROOM_FEE', 'OPERATION_FEE', 'DISEASE_FEE', 'DISABILITY_FEE', 'COMPENSATION_FEE');

-- CreateEnum
CREATE TYPE "SchoolType" AS ENUM ('Negeri', 'Swasta');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "refresh_token_expires_in" INTEGER,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "newEmail" TEXT,
    "password_hash" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialInfo" (
    "id" TEXT NOT NULL,
    "latestUserTotalIncome" INTEGER NOT NULL DEFAULT 0,
    "latestUserTotalExpense" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FinancialInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFinancialAccount" (
    "id" TEXT NOT NULL,
    "latestTotalIncome" INTEGER NOT NULL,
    "latestTotalExpense" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "providerName" TEXT NOT NULL,

    CONSTRAINT "UserFinancialAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFinancialTransactions" (
    "id" TEXT NOT NULL,
    "nominal" INTEGER NOT NULL,
    "type" "TransactionType" NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "UserFinancialTransactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProviderAccount" (
    "id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,

    CONSTRAINT "UserProviderAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProviderTransactions" (
    "id" TEXT NOT NULL,
    "nominal" INTEGER NOT NULL,
    "type" "TransactionType" NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "UserProviderTransactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialServiceProvider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FinancialServiceProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalInfo" (
    "id" TEXT NOT NULL,
    "status" "UserStatus",
    "phoneNumber" TEXT,
    "birthDate" TIMESTAMP(3),
    "addressLine" TEXT,
    "city" TEXT,
    "country" TEXT,
    "zipCode" TEXT,
    "notes" TEXT,
    "job" TEXT,
    "company" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PersonalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalIncome" (
    "id" TEXT NOT NULL,
    "salary" INTEGER NOT NULL DEFAULT 0,
    "bonus" INTEGER NOT NULL DEFAULT 0,
    "commission" INTEGER NOT NULL DEFAULT 0,
    "interestIncome" INTEGER NOT NULL DEFAULT 0,
    "dividends" INTEGER NOT NULL DEFAULT 0,
    "otherIncome" INTEGER NOT NULL DEFAULT 0,
    "salaryMonths" INTEGER NOT NULL DEFAULT 1,
    "bonusMonths" INTEGER NOT NULL DEFAULT 1,
    "commissionMonths" INTEGER NOT NULL DEFAULT 1,
    "interestIncomeMonths" INTEGER NOT NULL DEFAULT 1,
    "dividendsMonths" INTEGER NOT NULL DEFAULT 1,
    "otherIncomeMonths" INTEGER NOT NULL DEFAULT 1,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PersonalIncome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalExpense" (
    "id" TEXT NOT NULL,
    "mortgage" INTEGER NOT NULL DEFAULT 0,
    "property" INTEGER NOT NULL DEFAULT 0,
    "electricity" INTEGER NOT NULL DEFAULT 0,
    "waterSewerTrash" INTEGER NOT NULL DEFAULT 0,
    "transport" INTEGER NOT NULL DEFAULT 0,
    "phone" INTEGER NOT NULL DEFAULT 0,
    "internet" INTEGER NOT NULL DEFAULT 0,
    "home" INTEGER NOT NULL DEFAULT 0,
    "personal" INTEGER NOT NULL DEFAULT 0,
    "insurance" INTEGER NOT NULL DEFAULT 0,
    "entertainment" INTEGER NOT NULL DEFAULT 0,
    "subscriptions" INTEGER NOT NULL DEFAULT 0,
    "investment" INTEGER NOT NULL DEFAULT 0,
    "mortgageMonths" INTEGER NOT NULL DEFAULT 1,
    "propertyMonths" INTEGER NOT NULL DEFAULT 1,
    "electricityMonths" INTEGER NOT NULL DEFAULT 1,
    "waterSewerTrashMonths" INTEGER NOT NULL DEFAULT 1,
    "transportMonths" INTEGER NOT NULL DEFAULT 1,
    "phoneMonths" INTEGER NOT NULL DEFAULT 1,
    "internetMonths" INTEGER NOT NULL DEFAULT 1,
    "homeMonths" INTEGER NOT NULL DEFAULT 1,
    "personalMonths" INTEGER NOT NULL DEFAULT 1,
    "insuranceMonths" INTEGER NOT NULL DEFAULT 1,
    "entertainmentMonths" INTEGER NOT NULL DEFAULT 1,
    "subscriptionsMonths" INTEGER NOT NULL DEFAULT 1,
    "investmentMonths" INTEGER NOT NULL DEFAULT 1,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PersonalExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hospital" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Benefit" (
    "id" TEXT NOT NULL,
    "type" "BenefitType" NOT NULL,
    "hospitalId" TEXT NOT NULL,

    CONSTRAINT "Benefit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "program" "ProgramType" NOT NULL,
    "isChecked" BOOLEAN NOT NULL DEFAULT false,
    "need" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "own" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "healthPlanId" TEXT NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthPlan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,

    CONSTRAINT "HealthPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationPlan" (
    "id" TEXT NOT NULL,
    "childName" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "fundAllocated" INTEGER NOT NULL DEFAULT 0,
    "parentId" TEXT NOT NULL,

    CONSTRAINT "EducationPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationStage" (
    "id" TEXT NOT NULL,
    "stageName" TEXT NOT NULL,
    "schoolType" "SchoolType" NOT NULL DEFAULT 'Negeri',
    "childAge" INTEGER NOT NULL,
    "period" INTEGER NOT NULL DEFAULT 1,
    "costBeforeInflation" INTEGER NOT NULL DEFAULT 0,
    "inflationRate" INTEGER NOT NULL DEFAULT 0,
    "childId" TEXT NOT NULL,

    CONSTRAINT "EducationStage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialInfo_userId_key" ON "FinancialInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialServiceProvider_name_key" ON "FinancialServiceProvider"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalInfo_userId_key" ON "PersonalInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalIncome_userId_key" ON "PersonalIncome"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalExpense_userId_key" ON "PersonalExpense"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Program_healthPlanId_program_key" ON "Program"("healthPlanId", "program");

-- CreateIndex
CREATE UNIQUE INDEX "HealthPlan_userId_hospitalId_key" ON "HealthPlan"("userId", "hospitalId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialInfo" ADD CONSTRAINT "FinancialInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFinancialAccount" ADD CONSTRAINT "UserFinancialAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFinancialTransactions" ADD CONSTRAINT "UserFinancialTransactions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "UserFinancialAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProviderAccount" ADD CONSTRAINT "UserProviderAccount_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "FinancialServiceProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProviderTransactions" ADD CONSTRAINT "UserProviderTransactions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "UserProviderAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalInfo" ADD CONSTRAINT "PersonalInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalIncome" ADD CONSTRAINT "PersonalIncome_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalExpense" ADD CONSTRAINT "PersonalExpense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Benefit" ADD CONSTRAINT "Benefit_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_healthPlanId_fkey" FOREIGN KEY ("healthPlanId") REFERENCES "HealthPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthPlan" ADD CONSTRAINT "HealthPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthPlan" ADD CONSTRAINT "HealthPlan_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EducationPlan" ADD CONSTRAINT "EducationPlan_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EducationStage" ADD CONSTRAINT "EducationStage_childId_fkey" FOREIGN KEY ("childId") REFERENCES "EducationPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
