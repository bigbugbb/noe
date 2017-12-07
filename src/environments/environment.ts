// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiEndpoint: 'http://localhost:3000/api/v1',
  chatServerEndpoint: 'http://localhost:3001',
  stripePublishableKey: 'pk_test_d0Xi57r8Y91cX2PKwJ0dMIM7',
  noeFilesUpload: 'noe-file-upload-ireland',
  bucketRegion: 'eu-west-1',
  identityPoolId: 'eu-west-1:f1fa485c-3004-4a64-8ef6-9364031eddee'
};
