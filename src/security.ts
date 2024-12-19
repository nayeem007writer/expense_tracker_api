import { INestApplication } from '@nestjs/common';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { ENV } from './env';

const allowedOrigins = ENV.security.CORS_ALLOWED_ORIGINS;

export function setupSecurity(app: INestApplication): void {
  app.use(helmet());
  app.enableCors();
  app.use(
    rateLimit({
      windowMs: ENV.security.RATE_LIMIT_TTL,
      max: ENV.security.RATE_LIMIT_MAX,
      message:
        'Too many requests created from this IP, please try again after 5 minutes',
    })
  );
}
