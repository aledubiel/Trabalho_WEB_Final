-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "create_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME,
    "idOng" INTEGER,
    CONSTRAINT "Usuario_idOng_fkey" FOREIGN KEY ("idOng") REFERENCES "Ong" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ong" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "CNPJ" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "especie" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "data_nascimento" DATETIME NOT NULL,
    "porte" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "idOng" INTEGER,
    CONSTRAINT "Animal_idOng_fkey" FOREIGN KEY ("idOng") REFERENCES "Ong" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ong_CNPJ_key" ON "Ong"("CNPJ");
