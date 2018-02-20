# configurable-translate-http-loader
Be able to change prefix after "useFactory" call but before TranslateHttpLoader will be called.

## Why ? ##
Because I need to get async configuration that contains the prefix.

**Before**

```
  export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, '???', '.json'); // Don't know what to put as prefix because it's in config
  }

  @NgModule({
    imports: [
      TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: (createTranslateLoader),
              deps: [HttpClient] // Can not add 'CONFIG' here because is optional
          }
      })
    ]
  })
  export class AppModule {
    constructor(@Optional()@Inject('CONFIG') config) {
      // Have config.localesPath but too late to manage prefix of TranslateHttpLoader
    }
  }
```

**After**
```
  export function createTranslateLoader(http: HttpClient) {
    return new ConfigurableTranslateHttpLoader(http, '', '.json'); // You can put anything for prefix here. It will not be used.
  }

  @NgModule({
    imports: [
      TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: (createTranslateLoader),
              deps: [HttpClient]
          }
      })
    ]
  })
  export class AppModule {
    constructor(@Optional()@Inject('CONFIG') config) {
      ConfigurableTranslateHttpLoader.localesPathSubject.next(config.localesPath); // Give path of locales and allow TranslateHttpLoader to answer
    }
  }
```
