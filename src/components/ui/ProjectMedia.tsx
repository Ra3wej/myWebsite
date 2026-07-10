import type { MediaAsset } from '../../types/portfolio';

interface ProjectMediaProps {
  readonly media: MediaAsset;
  readonly projectName: string;
  readonly sequence: number;
}

function assertNever(value: never): never {
  throw new Error(`Unsupported media type: ${JSON.stringify(value)}`);
}

export function ProjectMedia({
  media,
  projectName,
  sequence,
}: ProjectMediaProps) {
  switch (media.type) {
    case 'placeholder':
      return (
        <div
          className={`project-media project-media--placeholder project-media--variant-${(sequence % 3) + 1}`}
          aria-label={`${projectName}: ${media.label}`}
          role="img"
        >
          <div className="media-grid" aria-hidden="true" />
          <div className="media-orbit media-orbit--one" aria-hidden="true" />
          <div className="media-orbit media-orbit--two" aria-hidden="true" />
          <div className="media-device" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="media-placeholder-label">
            <span>Media slot</span>
            {media.label}
          </p>
        </div>
      );
    case 'image':
      return (
        <figure className="project-media">
          <img
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            loading="lazy"
            decoding="async"
          />
        </figure>
      );
    case 'video':
      return (
        <figure className="project-media project-media--video">
          <video controls preload="metadata" poster={media.poster}>
            <source src={media.src} />
            Your browser cannot play this video.{' '}
            <a href={media.src}>Open the project video.</a>
          </video>
          <figcaption>{media.caption}</figcaption>
        </figure>
      );
    default:
      return assertNever(media);
  }
}
