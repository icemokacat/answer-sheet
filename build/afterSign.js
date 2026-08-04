const { execFileSync } = require('child_process');
const path = require('path');

module.exports = async function afterSign(context) {
  if (context.electronPlatformName !== 'darwin') return;

  const appPath = path.join(
    context.appOutDir,
    `${context.packager.appInfo.productFilename}.app`
  );
  const entitlements = path.join(__dirname, 'entitlements.mac.plist');

  execFileSync('codesign', [
    '--deep',
    '--force',
    '--options', 'runtime',
    '--sign', '-',
    '--entitlements', entitlements,
    appPath,
  ]);
};
