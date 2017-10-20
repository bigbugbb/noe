// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiEndpoint: 'http://localhost:3000/api/v1',
  noeFilesUpload: 'noe-file-upload',
  bucketRegion: 'ap-northeast-2',
  identityPoolId: 'ap-northeast-2:7d43ae4b-c5fb-4bea-8057-7f771406a078'
};
