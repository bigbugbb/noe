// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiEndpoint: 'http://localhost:3000/api/v1',
  noeFilesUpload: 'noe-files-upload',
  bucketRegion: 'us-east-1',
  identityPoolId: 'us-east-1:e823abf1-6888-4ec2-9d2e-b150c28921a4'
};
