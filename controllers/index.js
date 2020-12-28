'use strict';

import { SizeService } from '../services/index.js';

export const SizeController = {
  getSizesAvailable: (req, res) => {
    const color = (req.query && req.query.color) || 'blue';
    SizeService.getSizesAvailable(color, (sizesAvailable) => {
      res.send(sizesAvailable);
    });
  },
};
