import { Module } from '@nestjs/common';
import * as path from 'path';
import { I18nModule, AcceptLanguageResolver, QueryResolver, HeaderResolver, I18nService, I18N_TRANSLATIONS } from 'nestjs-i18n';
import { UsersController } from 'src/modules/users/users.controller';
import { UsersService } from 'src/modules/users/users.service';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en', // Default to English if no translation is found
      // fallbacks: {
      //   'hi': 'hi', // Hindi will fall back to Hindi
      //   'en': 'en', // English will fall back to English
      //   '*': 'en',  // Any other language will fall back to English
      // },
        loaderOptions: {
          path: path.join(process.cwd(), 'src/modules/common/multi-language/i18n/'), 
          watch: true, 
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
      
    }),
    UsersModule
  ],
  controllers: [UsersController],
  providers: [UsersService]
 
})
export class MultiLangModule {}