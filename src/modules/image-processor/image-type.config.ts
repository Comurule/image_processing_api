export enum AcceptedImageFormats {
  avif = 'avif',
  gif = 'gif',
  heif = 'heif',
  jpeg = 'jpeg',
  jpg = 'jpg',
  jp2 = 'jp2',
  png = 'png',
  svg = 'svg',
  tiff = 'tiff',
  tif = 'tif',
  webp = 'webp',
}

export type ProcessImageOptions = {
  imageType: AcceptedImageFormats;
  width: number;
  height: number;
  getFilename(filename: string): string;
};

export enum ImageTypeEnum {
  game = 'game',
  promotion = 'promotion',
}

export type ImageTypeConfigType = Record<ImageTypeEnum, ProcessImageOptions>;

export const imageTypeConfig: ImageTypeConfigType = {
  [ImageTypeEnum.game]: {
    imageType: AcceptedImageFormats.webp,
    width: 184,
    height: 256,
    getFilename: (filename: string) => `${filename}-thumbnail`,
  },
  [ImageTypeEnum.promotion]: {
    imageType: AcceptedImageFormats.webp,
    width: 361,
    height: 240,
    getFilename: (filename: string) => filename,
  },
};
