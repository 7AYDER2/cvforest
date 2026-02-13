import fs from 'node:fs';
import path from 'node:path';
import parse from 'html-react-parser';
import { marked } from 'marked';
import { getLocale } from 'next-intl/server';

export async function getPageContent(page: string) {
  const locale = await getLocale();

  const filePath = path.join(
    process.cwd(),
    'src',
    'features',
    'footer',
    'content',
    `${page}-${locale}.md`,
  );

  console.log(filePath);

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const html = await marked(fileContent);

  return parse(html);
}
