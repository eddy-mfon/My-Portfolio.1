import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// lucide-react 1.81.0 added the elevator, steering-wheel, globe-clock and
// bowl-chopsticks icons and reshaped square-sigma, smartphone and the
// rectangle icons. The dependency range must be able to resolve to that
// release so those shared exports are available.
const REQUIRED_LUCIDE_VERSION = [1, 81, 0];

const parseMinimumVersion = (range) => {
  const match = range.match(/\d+\.\d+\.\d+/);
  assert.ok(match, `Unable to read a version from range "${range}"`);
  return match[0].split('.').map(Number);
};

const isAtLeast = (actual, minimum) => {
  for (let index = 0; index < minimum.length; index += 1) {
    if (actual[index] > minimum[index]) return true;
    if (actual[index] < minimum[index]) return false;
  }
  return true;
};

test('lucide-react dependency floor is at least 1.81.0', async () => {
  const packageJson = JSON.parse(
    await readFile(new URL('../package.json', import.meta.url), 'utf8'),
  );

  const range = packageJson.dependencies?.['lucide-react'];
  assert.ok(range, 'lucide-react is missing from dependencies');

  const minimumVersion = parseMinimumVersion(range);
  assert.ok(
    isAtLeast(minimumVersion, REQUIRED_LUCIDE_VERSION),
    `lucide-react range "${range}" allows versions older than ${REQUIRED_LUCIDE_VERSION.join('.')}`,
  );
});
