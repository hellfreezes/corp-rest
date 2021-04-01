import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './users/users.module';
import { ProductsModule } from "./products/products.module";
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    UsersModule,
    ProductsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/corp-rest'),
    AuthModule
  ],
})
export class AppModule {}
