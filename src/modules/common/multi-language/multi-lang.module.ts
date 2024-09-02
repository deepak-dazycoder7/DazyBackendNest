import { Module } from '@nestjs/common';
import * as path from 'path';
import { I18nModule, AcceptLanguageResolver, QueryResolver, HeaderResolver, I18nService, I18N_TRANSLATIONS } from 'nestjs-i18n';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en', // Default to English if no translation is found
      fallbacks: {
        'hi': 'hi', // Hindi will fall back to Hindi
        'en': 'en', // English will fall back to English
        '*': 'en',  // Any other language will fall back to English
      },
        loaderOptions: {
          path: path.join(process.cwd(), 'src/modules/common/multi-language/i18n'), 
          watch: true, 
      },
    
      resolvers: [
        { use: QueryResolver, options: ['lang'] }, // Correct format
        AcceptLanguageResolver, // Class reference
        { use: HeaderResolver, options: ['x-lang'] }, // Correct format
      ]
      
    }),
    
  ],
 
})
export class MultiLangModule {}