import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { BRAND } from '@/content/seo';
import { SHARE_IMAGE, SHARE_IMAGE_COLORS } from '@/lib/seo/share-image';

export const alt = SHARE_IMAGE.alt;
export const size = { width: SHARE_IMAGE.width, height: SHARE_IMAGE.height };
export const contentType = SHARE_IMAGE.type;

/** Built once: the hero photo, uncropped, beside the brand name. */
export default async function Image() {
  const [photo, font] = await Promise.all([
    readFile(
      join(process.cwd(), 'public/images/hero/live-art-drawing.jpg'),
      'base64',
    ),
    readFile(
      join(process.cwd(), 'src/app/opengraph-image-assets/fraunces-700.ttf'),
    ),
  ]);

  // next/og supports inline styles only.
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: SHARE_IMAGE_COLORS.background,
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 48,
            color: SHARE_IMAGE_COLORS.text,
            fontFamily: 'Fraunces',
            fontSize: 112,
            lineHeight: 1.15,
            textAlign: 'center',
          }}
        >
          {BRAND}
        </div>
        {/* The photo is square, so a square slot keeps all of it in view. */}
        <img
          src={`data:image/jpeg;base64,${photo}`}
          alt=''
          width={SHARE_IMAGE.height}
          height={SHARE_IMAGE.height}
        />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Fraunces', data: font, weight: 700, style: 'normal' }],
    },
  );
}
