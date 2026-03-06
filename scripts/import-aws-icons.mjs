import { readdir, copyFile, mkdir } from 'fs/promises';
import { join } from 'path';

// ── CONFIG ──────────────────────────────────────────────────────
const SOURCE = './Icon-package_01302026/Architecture-Service-Icons_01302026';
const GROUP_SOURCE = './Icon-package_01302026/Architecture-Group-Icons_01302026';
const DEST = './src/icons/aws';
const SIZE = '48'; // which size to import — we use 48px

// Map Arch_ folder names → clean subfolder names in src/icons/aws/
const FOLDER_MAP = {
  'Arch_Analytics':                    'analytics',
  'Arch_Application-Integration':      'integration',
  'Arch_Business-Applications':        'business',
  'Arch_Cloud-Financial-Management':   'billing',
  'Arch_Compute':                      'compute',
  'Arch_Containers':                   'containers',
  'Arch_Customer-Enablement':          'support',
  'Arch_Database':                     'databases',
  'Arch_Developer-Tools':              'devtools',
  'Arch_End-User-Computing':           'euc',
  'Arch_Front-End-Web-Mobile':         'frontend',
  'Arch_Games':                        'games',
  'Arch_General-Icons':                'general',
  'Arch_Internet-of-Things':           'iot',
  'Arch_Machine-Learning':             'ml',
  'Arch_Management-Governance':        'management',
  'Arch_Media-Services':               'media',
  'Arch_Migration-Modernization':      'migration',
  'Arch_Networking-Content-Delivery':  'networking',
  'Arch_Quantum-Technologies':         'quantum',
  'Arch_Robotics':                     'robotics',
  'Arch_Satellite':                    'satellite',
  'Arch_Security-Identity-Compliance': 'security',
  'Arch_Serverless':                   'serverless',
  'Arch_Storage':                      'storage',
};

// Clean filename:
// "Arch_Amazon-EC2_48.svg"       → "ec2.svg"
// "Arch_AWS-Lambda_48.svg"       → "lambda.svg"
// "Arch_Amazon-S3_48.svg"        → "s3.svg"
function cleanName(filename) {
  return filename
    .replace(/^Arch_Amazon-/, '')   // strip "Arch_Amazon-"
    .replace(/^Arch_AWS-/, '')      // strip "Arch_AWS-"
    .replace(/^Arch_/, '')          // strip any remaining "Arch_"
    .replace(/_\d+\.svg$/, '.svg')  // strip size suffix "_48.svg" → ".svg"
    .replace(/\s+/g, '-')
    .replace(/_/g, '-')
    .replace(/[()]/g, '')
    .replace(/-+/g, '-')
    .toLowerCase();
}

async function importServiceIcons() {
  let total = 0;
  let skipped = 0;

  const categories = await readdir(SOURCE, { withFileTypes: true });

  for (const category of categories) {
    if (!category.isDirectory()) continue;

    const destSubfolder = FOLDER_MAP[category.name];
    if (!destSubfolder) {
      console.log(`⏭  Skipping unmapped: ${category.name}`);
      skipped++;
      continue;
    }

    // Look inside the size folder e.g. Arch_Compute/48/
    const sizeDir = join(SOURCE, category.name, SIZE);
    let files;
    try {
      files = await readdir(sizeDir);
    } catch {
      console.log(`⚠️  No ${SIZE}px folder in ${category.name}`);
      continue;
    }

    const svgs = files.filter(f => f.endsWith('.svg'));
    const dstDir = join(DEST, destSubfolder);
    await mkdir(dstDir, { recursive: true });

    for (const file of svgs) {
      const cleaned = cleanName(file);
      await copyFile(join(sizeDir, file), join(dstDir, cleaned));
      console.log(`✅ ${category.name}/${file} → aws/${destSubfolder}/${cleaned}`);
      total++;
    }
  }

  return { total, skipped };
}

async function importGroupIcons() {
  const dstDir = join(DEST, 'groups');
  await mkdir(dstDir, { recursive: true });

  let total = 0;
  const files = await readdir(GROUP_SOURCE);
  const svgs = files.filter(f =>
    f.endsWith('.svg') &&
    f.includes('_32.svg') &&   // use 32px for group icons
    !f.includes('Dark')        // skip dark variants
  );

  for (const file of svgs) {
    const cleaned = file
      .replace(/_32\.svg$/, '.svg')
      .replace(/\s+/g, '-')
      .replace(/_/g, '-')
      .replace(/[()]/g, '')
      .replace(/-+/g, '-')
      .toLowerCase();

    await copyFile(join(GROUP_SOURCE, file), join(dstDir, cleaned));
    console.log(`✅ Group/${file} → aws/groups/${cleaned}`);
    total++;
  }

  return total;
}

async function run() {
  console.log('🚀 Importing AWS icons...\n');
  await mkdir(DEST, { recursive: true });

  const { total: serviceTotal, skipped } = await importServiceIcons();
  const groupTotal = await importGroupIcons();

  const grand = serviceTotal + groupTotal;
  console.log(`\n🎉 Done!`);
  console.log(`   ${serviceTotal} service icons imported`);
  console.log(`   ${groupTotal} group icons imported`);
  console.log(`   ${grand} total icons in ${DEST}`);
  console.log(`   ${skipped} folders skipped`);
  console.log(`\n📁 Run svgo next to clean them up:`);
  console.log(`   bunx svgo --config svgo.config.mjs -r -f src/icons/aws/`);
}

run().catch(console.error);