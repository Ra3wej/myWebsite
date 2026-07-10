export type StorePlatform = 'App Store' | 'Google Play';

export type MediaAsset =
  | {
      readonly type: 'placeholder';
      readonly label: string;
    }
  | {
      readonly type: 'image';
      readonly src: string;
      readonly alt: string;
      readonly width: number;
      readonly height: number;
    }
  | {
      readonly type: 'video';
      readonly src: string;
      readonly poster: string;
      readonly caption: string;
    };

export interface StoreLink {
  readonly platform: StorePlatform;
  readonly href: string;
}

export interface Profile {
  readonly name: string;
  readonly title: string;
  readonly statement: string;
  readonly introduction: string;
  readonly email: string;
  readonly location: string;
}

export interface ProofPoint {
  readonly value: string;
  readonly label: string;
}

export interface Experience {
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly technologies: readonly string[];
  readonly confidential?: boolean;
}

export interface CapabilityGroup {
  readonly title: string;
  readonly summary: string;
  readonly skills: readonly string[];
}

export interface Project {
  readonly name: string;
  readonly category: string;
  readonly role: string;
  readonly summary: string;
  readonly technologies: readonly string[];
  readonly media: MediaAsset;
  readonly stores: readonly StoreLink[];
}

export interface Education {
  readonly institution: string;
  readonly college: string;
  readonly degree: string;
  readonly period: string;
}
