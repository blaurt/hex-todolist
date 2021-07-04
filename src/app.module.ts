import { Module } from '@nestjs/common';
import { RestApiModule } from './primary-adapters/web/rest-api/rest-api.module';

@Module({
  imports: [RestApiModule],
})
export class AppModule {}
