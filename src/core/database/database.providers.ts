import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { DBModelsEnum } from "@database/db-models.enum";
import { UserSchema } from '@schemas/user.schema';
import { NewsSchema } from "@schemas/news.schema";

const databaseConnection = {
  provide: DBModelsEnum.DATABASE_CONNECTION,
  useFactory: (): Promise<typeof mongoose> => mongoose.connect(process.env.DB_CONNECTION_STRING),
}

export const usersProvider =
    {
      provide: DBModelsEnum.USER_MODEL,
      useFactory: (connection: Connection) => connection.model('User', UserSchema),
      inject: [DBModelsEnum.DATABASE_CONNECTION],
    }

export const newsProvider =
    {
      provide: DBModelsEnum.NEWS_MODEL,
      useFactory: (connection: Connection) => connection.model('News', NewsSchema),
      inject: [DBModelsEnum.DATABASE_CONNECTION],
    }


export const databaseProviders = [databaseConnection, usersProvider, newsProvider];
