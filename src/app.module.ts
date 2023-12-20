import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './core/guards/jwt.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AppointmentsModule } from './appointments/appointments.module';
import { EventsModule } from './events/events.module';
import { AvailabilityModule } from './availability/availability.module';
import { PatientModule } from './patient/patient.module';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    AppointmentsModule,
    EventsModule,
    AvailabilityModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'auth',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        dbName: 'auth',
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        dbName: 'appointment',
      }),
      connectionName: 'appointment',
      inject: [ConfigService],
    }),
    PatientModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
