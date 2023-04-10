import 'dotenv/config';
import { Static, Type } from '@sinclair/typebox';
import Ajv from 'ajv';

export enum NodeEnv {
  development = 'development',
  test = 'test',
  production = 'production',
}

const ConfigSchema = Type.Strict(
  Type.Object({
    // NODE_ENV: Type.Enum(NodeEnv),
    LOG_LEVEL: Type.String(),
    YOUTUBE_API_KEY: Type.String(),
    COHERE_API_KEY: Type.String(),
    PLAY_HT_API_KEY: Type.String(),
    PLAY_HT_USER_ID: Type.String(),
  }),
);

const ajv = new Ajv({
  allErrors: true,
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true,
  // allowUnionTypes: true,
});

export type Config = Static<typeof ConfigSchema>;

const validate = ajv.compile(ConfigSchema);
const valid = validate(process.env);
if (!valid) {
  throw new Error('.env file validation failed - ' + JSON.stringify(validate.errors, null, 2));
}
