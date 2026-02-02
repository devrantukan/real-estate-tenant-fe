const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^"(.*)"$/, '$1'); // Remove quotes if present
      process.env[key] = value;
    }
  });
}

const prisma = new PrismaClient();

async function main() {
  console.log("Fetching Roles...");
  const roles = await prisma.role.findMany();
  console.log("Roles:", JSON.stringify(roles, null, 2));

  console.log("\nFetching Office Workers...");
  const workers = await prisma.officeWorker.findMany({
    include: { role: true }
  });
  console.log("Workers count:", workers.length);
  console.log("Workers:", JSON.stringify(workers.map(w => ({ 
    id: w.id, 
    name: w.name, 
    roleId: w.roleId, 
    roleSlug: w.role?.slug 
  })), null, 2));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
