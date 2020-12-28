'use strict';

import { get } from 'https';
import { load } from 'cheerio';

//https://www.polarnopyret.se/barnklader/underklader-nattplagg/nattlinnen/randigt-nattlinne-vuxen-mork-marinbla-60464376-483
//https://www.polarnopyret.se/barnklader/underklader-nattplagg/nattlinnen/randigt-nattlinne-vuxen-rod-60464376-503

// document
//   .querySelectorAll('button[type="button"]')[6]
//   .innerHTML.toString()
//   .toLowerCase()
//   .indexOf('>l<');

const colorToUrlMap = {
  blue:
    'https://www.polarnopyret.se/barnklader/underklader-nattplagg/nattlinnen/randigt-nattlinne-vuxen-mork-marinbla-60464376-483',
  red:
    'https://www.polarnopyret.se/barnklader/underklader-nattplagg/nattlinnen/randigt-nattlinne-vuxen-rod-60464376-503',
};

export const SizeService = {
  getSizesAvailable: (color, responseCallback) => {
    const url = colorToUrlMap[color];

    console.log(url);
    get(url, (res) => {
      let html = '';

      res.on('data', (chunk) => {
        html += chunk;
      });

      res.on('end', () => {
        const sizesAvailable = Parser.parse(html);
        responseCallback(sizesAvailable);
      });
    });
  },
};

class Parser {
  static parse(html) {
    const $ = load(html);
    let sizesAvailable = [];
    $('button[type="button"]').each((idx, el) => {
      const buttonContent = $(el).html().toLowerCase();
      console.log(buttonContent);
      console.log('\n');
      console.log(
        '--------------------------------------------------------------------------'
      );
      console.log('\n');
      const size =
        (buttonContent.indexOf('>xs<') !== -1 && 'XS') ||
        (buttonContent.indexOf('>s<') !== -1 && 'S') ||
        (buttonContent.indexOf('>m<') !== -1 && 'M') ||
        (buttonContent.indexOf('>l<') !== -1 && 'L') ||
        (buttonContent.indexOf('>xl<') !== -1 && 'XL') ||
        'no size';
      if (size !== 'no size') {
        if (buttonContent.indexOf('<div') === -1) {
          sizesAvailable.push(size);
        }
      }
    });
    return sizesAvailable;
  }
}
