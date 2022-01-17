import {
  Request, Response, NextFunction,
} from 'express';

// eslint-disable-next-line consistent-return
export default function handler(e: any, req: Request, res: Response, next: NextFunction): void {
  const msg = e.stack ? e.stack : e.toString();

  if (res.headersSent) {
    return next(e);
  }

  const errorMessage = {
    statusCode: +(e.status || e.statusCode || 500),
    body: msg,
  };

  res.status(errorMessage.statusCode);
  res.format({
    'application/json': () => {
      res.json({ message: errorMessage.body });
    },
    default: () => {
      res.type('text/plain').send(errorMessage.body);
    },
  });

  next();
}
